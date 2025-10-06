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
  status: "idle" | "booting" | "running" | "ready" | "error";
  installStatus: "idle" | "pending" | "done" | "error";
  devStatus: "idle" | "pending" | "running" | "error";
}

// ---------- Initial State ----------
const initialState: WebContainerState = {
  logs: [],
  liveUrl: null,
  status: "idle",
  installStatus: "idle",
  devStatus: "idle",
};

// ---------- Globals ----------
export let wc: WebContainer;
let shellWriter: WritableStreamDefaultWriter<any> | null = null;

// ---------- Helper Functions ----------
const stripAnsi = (str: string) => {
  return str.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '');
};

// ---------- Helper Log ----------
const logWithDispatch = (
  dispatch: any,
  text: string,
  type: Log["type"] = "info"
) => {
  dispatch(addLog({ text: stripAnsi(text), type, timestamp: new Date().toISOString() }));
};

// ---------- Async Thunks ----------

// Start Terminal Shell
export const startShell = createAsyncThunk<void, void>(
  "webcontainer/startShell",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      logWithDispatch(dispatch, "❄️ wait shell is about to start", "info")
      if (!wc) wc = await getWebContainer();
      logWithDispatch(dispatch, "🚀 Starting shell...", "info");

      const shell = await wc.spawn("jsh");

      shell.output.pipeTo(
        new WritableStream({
          write(data) {
            logWithDispatch(dispatch, String(data), "stdout");
          },
        })
      );

      if (shell.input) shellWriter = shell.input.getWriter();
      return;
    } catch (err: any) {
      logWithDispatch(dispatch, `❌ Shell failed: ${err.message}`, "error");
      return rejectWithValue(err.message);
    }
  }
);

// Send command to terminal shell
export const sendToShell = async (command: string) => {
  if (shellWriter) {
    await shellWriter.write(command + "\n");
  }
};

// Install Dependencies
export const installDependencies = createAsyncThunk<void, void>(
  "webcontainer/install",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!wc) wc = await getWebContainer();
      const installProcess = await wc.spawn("npm", ["install"]);

      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            logWithDispatch(dispatch, String(data), "stdout");
          },
        })
      );

      await installProcess.exit;
      logWithDispatch(dispatch, "✅ Dependencies installed", "success");
      return;
    } catch (err: any) {
      logWithDispatch(dispatch, `❌ Install failed: ${err.message}`, "error");
      return rejectWithValue(err.message);
    }
  }
);

// Run Dev Server
export const startDevServer = createAsyncThunk<string, void>(
  "webcontainer/devServer",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!wc) wc = await getWebContainer();
      const devProcess = await wc.spawn("npm", ["run", "dev"]);

      devProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            logWithDispatch(dispatch, String(data), "stdout");
          },
        })
      );

      return new Promise<string>((resolve, reject) => {
        wc.on("server-ready", (_port, url) => {
          logWithDispatch(dispatch, `🌐 Dev server running at ${url}`, "success");
          dispatch(setLiveUrl(url));
          resolve(url);
        });

        devProcess.exit.then((code) => {
          if (code !== 0) reject(new Error(`Dev server exited with code ${code}`));
        });
      });
    } catch (err: any) {
      logWithDispatch(dispatch, `❌ Dev server failed: ${err.message}`, "error");
      return rejectWithValue(err.message);
    }
  }
);

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
    // Start Shell
    builder
      .addCase(startShell.pending, (state) => { state.status = "running"; })
      .addCase(startShell.fulfilled, (state) => { state.status = "ready"; })
      .addCase(startShell.rejected, (state) => { state.status = "error"; });

    // Install Dependencies
    builder
      .addCase(installDependencies.pending, (state) => { state.installStatus = "pending"; })
      .addCase(installDependencies.fulfilled, (state) => { state.installStatus = "done"; })
      .addCase(installDependencies.rejected, (state) => { state.installStatus = "error"; });

    // Start Dev Server
    builder
      .addCase(startDevServer.pending, (state) => { state.devStatus = "pending"; })
      .addCase(startDevServer.fulfilled, (state, action: PayloadAction<string>) => {
        state.devStatus = "running";
        state.liveUrl = action.payload;
      })
      .addCase(startDevServer.rejected, (state) => { state.devStatus = "error"; });
  },
});

export const { addLog, clearLogs, setLiveUrl } = webContainerSlice.actions;
export default webContainerSlice.reducer;
