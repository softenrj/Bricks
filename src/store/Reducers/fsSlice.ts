import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { wc } from "./webContainer";
import { getFSTree } from "@/service/fsWalker";
import { LanguageEnum } from "@/feature/LanguageEnum";
import { fileRename, fileUpdate, newFileSocket, newFolderSocket, removeFile } from "@/socket/project.FS";
import { FSState } from "@/types/FSState";
import { detectLanguage, getFileContent } from "@/feature/fsSystem";
export type FSData = { [key: string]: string | FSData };

const initialState: FSState = {
  tree: {},
  activePath: '.',
  projectName: "",
  selectedFile: null,
  selectedFileContent: "",
  selectedLanguage: LanguageEnum.md,
  openTabs: [],
};

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
      const segment = path.split('/');
      segment.pop();
      const Rpath = segment.join('/');
      const parentPath = Rpath === "" ? '.' : Rpath;
      state.activePath = parentPath;

      if (!state.openTabs.some(tab => tab.name === path)) {
        state.openTabs.push({ name: path, isEditing: false });
      }

      state.selectedFileContent = getFileContent(state.tree, path);
      state.selectedLanguage = detectLanguage(path);
    },

    switchTab: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      state.selectedFile = path;
      const segment = path.split('/');
      segment.pop();
      const Rpath = segment.join('/');
      const parentPath = Rpath === "" ? '.' : Rpath;
      state.activePath = parentPath;
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
    },
    setActivepath: (state, action: PayloadAction<string>) => {
      let parentPath = action.payload.trim();
      if (parentPath === "") parentPath = ".";
      if (parentPath.startsWith("./")) parentPath = parentPath.slice(2);
      if (parentPath.endsWith("/")) parentPath = parentPath.slice(0, -1);
      state.activePath = parentPath;
    },

    newFile: (state, action: PayloadAction<{ parentPath: string; name: string, projectId: string }>) => {
      const { parentPath, name, projectId } = action.payload;
      const cleanParent = parentPath === "." ? "" : parentPath;
      const path = cleanParent ? `${cleanParent}/${name}` : name;
      const segments = path.split("/");

      // walk tree
      let node: any = state.tree;
      for (let i = 0; i < segments.length - 1; i++) {
        const seg = segments[i];
        if (!node[seg]) node[seg] = {};
        node = node[seg] as FSData;
      }

      node[segments[segments.length - 1]] = "";
      state.selectedFile = path;
      state.activePath = cleanParent || ".";
      state.selectedFileContent = "";
      state.selectedLanguage = detectLanguage(name);

      if (!state.openTabs.some(t => t.name === path)) {
        state.openTabs.push({ name: path, isEditing: false });
      }

      fileUpdate(name, cleanParent || ".", "");
      wc?.fs.writeFile(path, "");
      newFileSocket(parentPath,name, projectId)
    },

    newFolder: (state, action: PayloadAction<{ parentPath: string; name: string, projectId: string }>) => {
      const { parentPath, name, projectId } = action.payload;
      const cleanParent = parentPath === "." ? "" : parentPath;
      const path = cleanParent ? `${cleanParent}/${name}` : name;
      const segments = path.split("/");

      let node: any = state.tree;
      for (let i = 0; i < segments.length - 1; i++) {
        const seg = segments[i];
        if (!node[seg]) node[seg] = {};
        node = node[seg] as FSData;
      }

      node[segments[segments.length - 1]] = {};
      state.activePath = path;

      newFolderSocket(parentPath,name, projectId)
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

export const { setSelectedFile, setFileLanguage, setFileContent, updateFileContent, setTree, switchTab, closeTab, setProjectName, setFileChange, renameFileName, deleteFile, setActivepath, newFile, newFolder } = fsSlice.actions;

export default fsSlice.reducer;
