import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { wc } from "./webContainer";
import { getFSTree } from "@/service/fsWalker";
import { LanguageEnum } from "@/feature/LanguageEnum";
import { isValidBase64 } from "@/feature/projectDownload";

export type FSData = { [key: string]: string | FSData };

interface FSState {
  tree: FSData;
  projectName: string;
  selectedFile: string | null;
  selectedFileContent: string | null;
  selectedLanguage: typeof LanguageEnum[keyof typeof LanguageEnum];
  openTabs: { name: string; isEditing: boolean }[];
}

const initialState: FSState = {
  tree: {},
  projectName: "",
  selectedFile: null,
  selectedFileContent: "",
  selectedLanguage: LanguageEnum.md,
  openTabs: [],
};

// Helper to get file content from tree
function getFileContent(tree: FSData, path: string): string {
  const segments = path.split("/");
  let node: any = tree;
  for (const seg of segments) {
    if (!node) return "";
    node = node[seg];
  }
  return typeof node === "string" ? isValidBase64(node) ? atob(node) : node : "";
}

// Optional: detect language from file extension
function detectLanguage(path: string): typeof LanguageEnum[keyof typeof LanguageEnum] {
  const ext = path.split(".").pop() || "";
  return (LanguageEnum as any)[ext] || LanguageEnum.md;
}

// Async thunks
export const fetchFsTree = createAsyncThunk("fs/fetchTree", async () => {
  return await getFSTree(".");
});

export const writeFile = createAsyncThunk(
  "fs/writeFile",
  async ({ path, content }: { path: string; content: string }) => {
    await wc!.fs.writeFile(path, content);
    return { path, content }; // raw string, no btoa
  }
);

const fsSlice = createSlice({
  name: "fs",
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      state.selectedFile = path;

      if (!state.openTabs.some(tab => tab.name === path)) {
        state.openTabs.push({ name: path, isEditing: false });
      }

      state.selectedFileContent = getFileContent(state.tree, path);
      state.selectedLanguage = detectLanguage(path);
    },

    switchTab: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      state.selectedFile = path;
      state.selectedFileContent = getFileContent(state.tree, path);
      state.selectedLanguage = detectLanguage(path);
    },

    closeTab: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      state.openTabs = state.openTabs.filter(tab => tab.name !== path);

      if (state.selectedFile === path) {
        state.selectedFile = state.openTabs.length > 0 ? state.openTabs[0].name : null;
        state.selectedFileContent = state.selectedFile ? getFileContent(state.tree, state.selectedFile) : "";
        state.selectedLanguage = state.selectedFile ? detectLanguage(state.selectedFile) : LanguageEnum.md;
      }
    },

    setTree: (state, action: PayloadAction<FSData>) => {
      state.tree = action.payload;
    },

    setFileChange: (state, action: PayloadAction<{ name: string; isEditing: boolean }>) => {
      const { name, isEditing } = action.payload;

      const tab = state.openTabs.find((t) => t.name === name);
      if (tab) {
        tab.isEditing = isEditing;
      }
    },

    setProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },

    setFileLanguage: (state, action: PayloadAction<typeof LanguageEnum[keyof typeof LanguageEnum]>) => {
      state.selectedLanguage = action.payload;
    },

    setFileContent: (state, action: PayloadAction<string>) => {
      state.selectedFileContent = action.payload;
    },

    updateFileContent: (state, action: PayloadAction<{ path: string; content: string }>) => {
      const { path, content } = action.payload;

      // Update current active file content if selected
      if (state.selectedFile === path) {
        state.selectedFileContent = content;
      }

      // Update FS tree
      const segments = path.split("/");
      let node: any = state.tree;
      for (let i = 0; i < segments.length - 1; i++) {
        node = node[segments[i]] as FSData;
      }
      node[segments[segments.length - 1]] = content;

      // Optional: write directly to wc.fs (auto-save)
      if (wc) {
        wc.fs.writeFile(path, content);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(writeFile.fulfilled, (state, action) => {
      const { path, content } = action.payload;
      if (state.selectedFile === path) {
        state.selectedFileContent = content; // raw string
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
  setProjectName,
  setFileChange
} = fsSlice.actions;

export default fsSlice.reducer;
