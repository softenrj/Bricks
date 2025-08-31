import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getWebContainer } from "@/service/webContainer";
import { WebContainer } from "@webcontainer/api";

export type Log = {
  text: string;
  type: "stdout" | "info" | "error" | "success" | "command";
  timestamp: string;
};

interface WebContainerState {
  logs: Log[];
  liveUrl: string | null;
  status: "idle" | "booting" | "ready" | "installing" | "running" | "error";
}

const initialState: WebContainerState = {
  logs: [],
  liveUrl: null,
  status: "idle",
};

// ------------------ Globals ------------------
export let wc: WebContainer;
let inputWriter: WritableStreamDefaultWriter<any> | null = null;

// helper to log
const logWithDispatch = (
  dispatch: any,
  text: string,
  type: Log["type"] = "info"
) => {
  dispatch(addLog({ text, type, timestamp: new Date().toISOString() }));
};

// ------------------ Exports for interactive input ------------------
export const sendToProcess = async (message: string) => {
  if (inputWriter) {
    await inputWriter.write(message + "\n");
  }
};

// ------------------ Thunks ------------------
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

export const createViteProject = createAsyncThunk(
  "webcontainer/vite",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!wc) wc = await getWebContainer();

      const proc = await wc.spawn("npm", [
        "create",
        "vite@latest",
        ".",
        "--",
        "--template",
        "react-ts",
      ]);

      proc.output.pipeTo(
        new WritableStream({
          write(data) {
            logWithDispatch(dispatch, String(data), "stdout");
          },
        })
      );

      if (proc.input) {
        inputWriter = proc.input.getWriter(); // ✅ stored globally
      }

      const exitCode = await proc.exit;
      if (exitCode !== 0)
        throw new Error(`Vite project creation failed (code ${exitCode})`);

      logWithDispatch(dispatch, "🚀 Vite project created successfully", "success");
      return "ready";
    } catch (err: any) {
      logWithDispatch(dispatch, `❌ Vite project failed: ${err.message}`, "error");
      return rejectWithValue(err.message);
    }
  }
);

export const installDeps = createAsyncThunk(
  "webcontainer/install",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!wc) wc = await getWebContainer();
      const proc = await wc.spawn("npm", ["install"], { cwd: "/" });

      proc.output.pipeTo(
        new WritableStream({
          write(data) {
            logWithDispatch(dispatch, String(data), "stdout");
          },
        })
      );

      const exitCode = await proc.exit;
      if (exitCode !== 0)
        throw new Error(`npm install failed with code ${exitCode}`);

      logWithDispatch(dispatch, "📦 Dependencies installed", "success");
      return "ready";
    } catch (err: any) {
      logWithDispatch(dispatch, `❌ Install failed: ${err.message}`, "error");
      return rejectWithValue(err.message);
    }
  }
);

export const startDevServer = createAsyncThunk(
  "webcontainer/dev",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!wc) wc = await getWebContainer();
      const proc = await wc.spawn("npm", ["run", "dev"], { cwd: "/" });

      proc.output.pipeTo(
        new WritableStream({
          write(data) {
            logWithDispatch(dispatch, String(data), "stdout");
          },
        })
      );

      wc.on("server-ready", (_: number, url: string) => {
        dispatch(setLiveUrl(url));
        logWithDispatch(dispatch, `🌍 Dev server running at ${url}`, "success");
      });

      return "running";
    } catch (err: any) {
      logWithDispatch(dispatch, `❌ Dev server failed: ${err.message}`, "error");
      return rejectWithValue(err.message);
    }
  }
);

// ------------------ Slice ------------------
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
      // Boot
      .addCase(bootWebContainer.pending, (state) => {
        state.status = "booting";
      })
      .addCase(bootWebContainer.fulfilled, (state) => {
        state.status = "ready";
      })
      .addCase(bootWebContainer.rejected, (state) => {
        state.status = "error";
      })

      // Vite create
      .addCase(createViteProject.pending, (state) => {
        state.status = "installing";
      })
      .addCase(createViteProject.fulfilled, (state) => {
        state.status = "ready";
      })
      .addCase(createViteProject.rejected, (state) => {
        state.status = "error";
      })

      // Install
      .addCase(installDeps.pending, (state) => {
        state.status = "installing";
      })
      .addCase(installDeps.fulfilled, (state) => {
        state.status = "ready";
      })
      .addCase(installDeps.rejected, (state) => {
        state.status = "error";
      })

      // Dev server
      .addCase(startDevServer.pending, (state) => {
        state.status = "running";
      })
      .addCase(startDevServer.fulfilled, (state) => {
        state.status = "running";
      })
      .addCase(startDevServer.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addLog, clearLogs, setLiveUrl } = webContainerSlice.actions;
export default webContainerSlice.reducer;
