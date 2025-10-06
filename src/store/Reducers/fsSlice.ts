import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { wc } from "./webContainer";
import { getFSTree } from "@/service/fsWalker";
import { LanguageEnum } from "@/feature/LanguageEnum";
import { isValidBase64 } from "@/feature/projectDownload";
import { fileRename, fileUpdate, removeFile } from "@/socket/project.FS";

export type FSData = { [key: string]: string | FSData };

interface FSState {
  tree: FSData;
  activePath: string;
  projectName: string;
  selectedFile: string | null;
  selectedFileContent: string | null;
  selectedLanguage: typeof LanguageEnum[keyof typeof LanguageEnum];
  openTabs: { name: string; isEditing: boolean }[];
}

const initialState: FSState = {
  tree: {},
  activePath: '.',
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
      state.activePath = path;

      if (!state.openTabs.some(tab => tab.name === path)) {
        state.openTabs.push({ name: path, isEditing: false });
      }

      state.selectedFileContent = getFileContent(state.tree, path);
      state.selectedLanguage = detectLanguage(path);
    },

    switchTab: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      state.selectedFile = path;
      state.activePath = path;
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

      const name = segments.pop()!;
      const parentPath = segments.length > 0 ? segments.join('/') : '.';

      fileUpdate(name, parentPath, content);

      if (wc) {
        wc.fs.writeFile(path, content);
      }
    },

    renameFileName: (state, action: PayloadAction<{ oldPath: string; newName: string }>) => {
      const { oldPath, newName } = action.payload;
      const segments = oldPath.split("/");
      const oldName = segments.pop()!;
      if (oldName === newName) return;
      let node: any = state.tree;

      // Navigate to parent folder
      for (const seg of segments) {
        node = node[seg] as FSData;
        if (!node) return;
      }

      node[newName] = node[oldName];
      delete node[oldName];

      state.openTabs = state.openTabs.map(tab =>
        tab.name === oldPath ? { ...tab, name: segments.length > 0 ? `${segments.join("/")}/${newName}` : newName } : tab
      );

      if (state.selectedFile === oldPath) {
        state.selectedFile = segments.length > 0 ? `${segments.join("/")}/${newName}` : newName;
      }

      const parentPath = segments.length > 0 ? segments.join("/") : ".";
      fileRename(parentPath, oldName, newName)
    },

    deleteFile: (state, action: PayloadAction<{ fullPath: string; name: string }>) => {
      const { fullPath, name } = action.payload;
      const segments = fullPath.split("/");
      segments.pop(); 

      let node: any = state.tree;

      for (const seg of segments) {
        node = node[seg] as FSData;
        if (!node) return; 
      }

      delete node[name];

      state.openTabs = state.openTabs.filter(tab => tab.name !== fullPath);

      if (state.selectedFile === fullPath) {
        state.selectedFile = state.openTabs.length > 0 ? state.openTabs[0].name : null;
        state.selectedFileContent = state.selectedFile
          ? getFileContent(state.tree, state.selectedFile)
          : "";
      }
      const parentPath = segments.length > 0 ? segments.join("/") : ".";
      removeFile(parentPath, name);
    }

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
  setFileChange,
  renameFileName,
  deleteFile
} = fsSlice.actions;

export default fsSlice.reducer;
