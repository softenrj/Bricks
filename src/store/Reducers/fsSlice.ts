import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { wc } from "./webContainer";
import { getFSTree } from "@/service/fsWalker";
import { LanguageEnum } from "@/feature/LanguageEnum";

export type FSData = { [key: string]: string | FSData };

interface FSState {
  tree: FSData;
  selectedFile: string | null;               // current active file
  selectedFileContent: string | null;
  selectedLanguage: typeof LanguageEnum[keyof typeof LanguageEnum];
  openTabs: string[];                        // all open tabs
}

const initialState: FSState = {
  tree: {},
  selectedFile: null,
  selectedFileContent: "",
  selectedLanguage: LanguageEnum.md,
  openTabs: [],
};

export const fetchFsTree = createAsyncThunk("fs/fetchTree", async () => {
  return await getFSTree(".");
});

export const writeFile = createAsyncThunk(
  "fs/writeFile",
  async ({ path, content }: { path: string; content: string }) => {
    await wc!.fs.writeFile(path, content);
    return { path, content: btoa(content) };
  }
);

const fsSlice = createSlice({
  name: "fs",
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      state.selectedFile = path;

      if (!state.openTabs.includes(path)) {
        state.openTabs.push(path);
      }

      const segments = path.split("/");
      let node: any = state.tree;
      for (const seg of segments) {
        if (!node) break;
        node = node[seg];
      }
      state.selectedFileContent = typeof node === "string" ? node : "";
    },

    switchTab: (state, action: PayloadAction<string>) => {
      state.selectedFile = action.payload;

      const segments = action.payload.split("/");
      let node: any = state.tree;
      for (const seg of segments) {
        if (!node) break;
        node = node[seg];
      }
      state.selectedFileContent = typeof node === "string" ? node : "";
    },

    closeTab: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      state.openTabs = state.openTabs.filter((f) => f !== path);

      if (state.selectedFile === path) {
        state.selectedFile = state.openTabs.length > 0 ? state.openTabs[0] : null;

        if (state.selectedFile) {
          const segments = state.selectedFile.split("/");
          let node: any = state.tree;
          for (const seg of segments) {
            if (!node) break;
            node = node[seg];
          }
          state.selectedFileContent = typeof node === "string" ? node : "";
        } else {
          state.selectedFileContent = "";
        }
      }
    },

    setTree: (state, action: PayloadAction<FSData>) => {
      state.tree = action.payload;
    },

    setFileLanguage: (state, action: PayloadAction<typeof LanguageEnum[keyof typeof LanguageEnum]>) => {
      state.selectedLanguage = action.payload;
    },

    setFileContent: (state, action: PayloadAction<string>) => {
      state.selectedFileContent = action.payload;
    },

    updateFileContent: (state, action: PayloadAction<{ path: string; content: string }>) => {
      const { path, content } = action.payload;

      if (state.selectedFile === path) {
        state.selectedFileContent = content;
      }

      const segments = path.split("/");
      let node: any = state.tree;
      for (let i = 0; i < segments.length - 1; i++) {
        node = node[segments[i]] as FSData;
      }
      node[segments[segments.length - 1]] = content;

      if (wc) {
        wc.fs.writeFile(path, content);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(writeFile.fulfilled, (state, action) => {
      const { path, content } = action.payload;
      if (state.selectedFile === path) {
        state.selectedFileContent = atob(content);
      }
    });
  },
});

export const {
  setSelectedFile,
  setFileLanguage,
  setFileContent,
  updateFileContent,
  setTree,
  switchTab,
  closeTab,
} = fsSlice.actions;

export default fsSlice.reducer;
