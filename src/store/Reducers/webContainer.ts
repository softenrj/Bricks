import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getWebContainer } from "@/service/webContainer";
import { WebContainer } from "@webcontainer/api";

// ---------- Types ----------
export type Log = {
  text: string;
  type: "stdout" | "info" | "error" | "success" | "command";
  timestamp: string;
};

interface WebContainerState {
  logs: Log[];
  liveUrl: string | null;
  status: "idle" | "booting" | "ready" | "running" | "error";
}

const initialState: WebContainerState = {
  logs: [],
  liveUrl: null,
  status: "idle",
};

// ---------- Globals ----------
export let wc: WebContainer;
let shellWriter: WritableStreamDefaultWriter<any> | null = null;

// helper log
const logWithDispatch = (
  dispatch: any,
  text: string,
  type: Log["type"] = "info"
) => {
  dispatch(addLog({ text, type, timestamp: new Date().toISOString() }));
};

// ---------- Thunks ----------
export const bootWebContainer = createAsyncThunk(
  "webcontainer/boot",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!wc) {
        logWithDispatch(dispatch, "⚡ Booting WebContainer...", "info");
        wc = await getWebContainer();
      }
      logWithDispatch(dispatch, "✅ WebContainer ready", "success");
      return "ready";
    } catch (err: any) {
      logWithDispatch(dispatch, `❌ Boot failed: ${err.message}`, "error");
      return rejectWithValue(err.message);
    }
  }
);

export const startShell = createAsyncThunk(
  "webcontainer/shell",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!wc) wc = await getWebContainer();

      logWithDispatch(dispatch, "🚀 Starting shell...", "info");

      // Start persistent shell (like bash)
      const shell = await wc.spawn("jsh");

      // Capture output
      shell.output.pipeTo(
        new WritableStream({
          write(data) {
            logWithDispatch(dispatch, String(data), "stdout");
          },
        })
      );

      // Save writer for stdin
      if (shell.input) {
        shellWriter = shell.input.getWriter();
      }

      return "running";
    } catch (err: any) {
      logWithDispatch(dispatch, `❌ Shell failed: ${err.message}`, "error");
      return rejectWithValue(err.message);
    }
  }
);

// Send command to shell
export const sendToShell = async (command: string) => {
  if (shellWriter) {
    await shellWriter.write(command + "\n");
  }
};

// ---------- Slice ----------
const webContainerSlice = createSlice({
  name: "webcontainer",
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<Log>) => {
      state.logs.push(action.payload);
    },
    clearLogs: (state) => {
      state.logs = [];
    },
    setLiveUrl: (state, action: PayloadAction<string>) => {
      state.liveUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootWebContainer.pending, (state) => {
        state.status = "booting";
      })
      .addCase(bootWebContainer.fulfilled, (state) => {
        state.status = "ready";
      })
      .addCase(bootWebContainer.rejected, (state) => {
        state.status = "error";
      })
      .addCase(startShell.pending, (state) => {
        state.status = "running";
      })
      .addCase(startShell.fulfilled, (state) => {
        state.status = "running";
      })
      .addCase(startShell.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addLog, clearLogs, setLiveUrl } = webContainerSlice.actions;
export default webContainerSlice.reducer;
