// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getWebContainer, initFsWatcherPipeLine } from "@/service/webContainer";
import { WebContainer } from "@webcontainer/api";
import { AppDispatch } from "../store";

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
  writeTree: boolean;
}

// ---------- Initial State ----------
const initialState: WebContainerState = {
  logs: [],
  liveUrl: null,
  status: "idle",
  installStatus: "idle",
  devStatus: "idle",
  writeTree: false
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
      logWithDispatch(dispatch, ` Shell failed: ${err.message}`, "error");
      return rejectWithValue(err.message);
    }
  }
);

// Send command to terminal shell
export const sendToShell = async (
  command: string,
  dispatch: AppDispatch,
  projectId: string,
  writing: boolean,
  onPackageJsonUpdate?: (content: string) => void
) => {
  const npmCommandRegex = /^(npm\s+(install|i|uninstall|remove|update|add))/;

  if (npmCommandRegex.test(command.trim())) {
    try {
      const wc = await getWebContainer();
      if (!wc) return;

      const args = command.trim().split(" ").slice(1);

      logWithDispatch(dispatch, `Dependencies installing: ${args.join(" ")}`, "info");

      const process = await wc.spawn("npm", args);


      const writer = new WritableStream({
        write(data) {
          logWithDispatch(dispatch, String(data), "stdout");
        },
      });
      process.output.pipeTo(writer);
      await process.exit;
      // Refresh package.json after npm finishes
      // const content = await wc.fs.readFile("package.json", "utf-8");
      // onPackageJsonUpdate?.(content);

      logWithDispatch(dispatch, `Dependencies installed successfully!`, "success");
    } catch (err: any) {
      logWithDispatch(dispatch, `Failed to run npm command: ${err.message}`, "error");
    }
  } else if (shellWriter) {
    // fallback for normal shell commands
    await shellWriter.write(command + "\n");
  }
};



// Install Dependencies
export const installDependencies = createAsyncThunk<void, void>(
  "webcontainer/install",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (!wc) wc = await getWebContainer();
      logWithDispatch(dispatch, "Dependencies installing .. wait", "success");

      const lockFileExists = await wc.fs
        .readFile("./package-lock.json")
        .then(() => true)
        .catch(() => false);

      const command = lockFileExists ? ["ci", "--silent"] : ["install", "--silent"];
      const installProcess = await wc.spawn("npm", command);

      let logBuffer = "";
      const flushLogs = () => {
        if (logBuffer) {
          dispatch(
            addLog({
              text: logBuffer,
              type: "stdout",
              timestamp: new Date().toISOString(),
            })
          );
          logBuffer = "";
        }
      };

      const intervalId = setInterval(flushLogs, 200);

      const writer = new WritableStream({
        write(data) {
          logBuffer += String(data);
          if (logBuffer.length > 4096) flushLogs();
        },
      });

      installProcess.output.pipeTo(writer);
      const exitCode = await installProcess.exit;

      flushLogs();
      clearInterval(intervalId);

      if (exitCode !== 0) {
        logWithDispatch(dispatch, `Install exited with code ${exitCode}`, "error");
        return rejectWithValue(`Install failed with code ${exitCode}`);
      }

      logWithDispatch(dispatch, "Dependencies installed successfully", "success");
      return;
    } catch (err: any) {
      logWithDispatch(dispatch, `Install failed: ${err.message}`, "error");
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
    chageWriteTree: (state, action: PayloadAction<boolean>) => {
      state.writeTree = action.payload;
    }
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

export const { addLog, clearLogs, setLiveUrl, chageWriteTree } = webContainerSlice.actions;
export default webContainerSlice.reducer;