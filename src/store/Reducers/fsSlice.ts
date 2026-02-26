// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { wc } from "./webContainer";
import { getFSTree } from "@/service/fsWalker";
import { LanguageEnum } from "@/feature/LanguageEnum";
import { fileRename, fileUpdate, fileUpdateCreate, folderRemove, newFileSocket, newFolderSocket, removeFile } from "@/socket/project.FS";
import { FSState } from "@/types/FSState";
import { detectLanguage, getFileContent } from "@/feature/fsSystem";
import { FSTYPE } from "@/types/project";
import { ArchProjectCode } from "@/types/arch.typs";
import { ISnapshotFile } from "@/types/snapshot";
import { removeFolder } from "@/service/webContainer";
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
    return { path, content }; //? # 90'th commit 
  }
);

function cleanupEmptyDirs(root: FSData, path: string[]) {
  if (path.length === 0) return;

  const name = path.pop()!;
  let node = root;

  for (const seg of path) {
    node = node[seg] as FSData;
  }

  if (Object.keys(node[name]).length === 0) {
    delete node[name];
  }
}

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
    resetFs: (state, action: PayloadAction<string>) => {
      const projectId = action.payload;
      const oldProjectId = localStorage.getItem("bricks:projectId");

      if (!oldProjectId || oldProjectId !== projectId) {
        localStorage.setItem("bricks:projectId", projectId);
        return { ...initialState };
      }
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

    updateFileContent: (state, action: PayloadAction<{ path: string; content: string, projectId: string }>) => {
      const { path, content, projectId } = action.payload;
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

      if (wc) {
        wc.fs.writeFile(path, content);
      }
    },

    deleteFolder: (state, action: PayloadAction<{ path: string; projectId: string }>) => {
      const { path , projectId } = action.payload;
      let node = state.tree;
      const segments = path.split("/");
      const name = segments.at(-1);
      for (let i = 0; i< segments.length - 1; i++) {
        const seg = segments[i];
        if (!node[seg]) break;
        node = node[seg] as FSData;
      }
      
      if (name) delete node[name]
      folderRemove(path,projectId)
      removeFolder(path);
    },

    renameFileName: (state, action: PayloadAction<{ oldPath: string; newName: string, projectId: string }>) => {
      const { oldPath, newName, projectId } = action.payload;
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
      fileRename(parentPath, oldName, newName, projectId)
    },

    deleteFile: (state, action: PayloadAction<{ fullPath: string; name: string, projectId: string }>) => {
      const { fullPath, name, projectId } = action.payload;
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
      removeFile(parentPath, name, projectId);
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

      fileUpdate(name, cleanParent || ".", "", projectId);
      wc?.fs.writeFile(path, "");
      newFileSocket(parentPath, name, projectId)
    },

    newFileWithContent: (state, action: PayloadAction<{ parentPath: string; name: string, projectId: string, content: string }>) => {
      const { parentPath, name, projectId, content } = action.payload;
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

      node[segments[segments.length - 1]] = content;
      state.selectedFile = path;
      state.activePath = cleanParent || ".";
      state.selectedFileContent = content;
      state.selectedLanguage = detectLanguage(name);

      if (!state.openTabs.some(t => t.name === path)) {
        state.openTabs.push({ name: path, isEditing: false });
      }

      newFileSocket(parentPath, name, projectId, content)
    },

    fileCreateUpdateFlow: (state, action: PayloadAction<{ parentPath: string; name: string, projectId: string, content: string, type: string }>) => {
      const { parentPath, name, projectId, content, type } = action.payload;
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

      node[segments[segments.length - 1]] = content;
      // state.selectedFile = path;
      // state.activePath = cleanParent || ".";
      // state.selectedFileContent = content;
      // state.selectedLanguage = detectLanguage(name);

      // if (!state.openTabs.some(t => t.name === path)) {
      //   state.openTabs.push({ name: path, isEditing: false });
      // }

      // fileUpdate(name, cleanParent || ".", content, projectId);
      fileUpdateCreate(parentPath, name, projectId, content, type)
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

      newFolderSocket(parentPath, name, projectId)
    },

    aiCodeGen: (_state, action: PayloadAction<string>) => {
      _state.selectedFileContent = action.payload
    },
    closeOher: (_state, action: PayloadAction<string | undefined>) => {
      const secureTabName = action.payload;
      if (typeof secureTabName === 'undefined') return;
      const tab = _state.openTabs.find(item => item.name === secureTabName)
      if (tab) {
        _state.openTabs = [tab];
        _state.selectedFile = secureTabName;
        _state.selectedFileContent = _state.selectedFile ? getFileContent(_state.tree, secureTabName) : "";
        _state.selectedLanguage = _state.selectedFile ? detectLanguage(_state.selectedFile) : LanguageEnum.md;
      }
    },
    closeToRight: (_state, action: PayloadAction<string | undefined>) => {
      const startingTab = action.payload;
      if (!startingTab) return;

      const idx = _state.openTabs.findIndex(item => item.name === startingTab);
      if (idx === -1) return;
      _state.openTabs = _state.openTabs.filter((_, index) => index <= idx);
      const isOpenTabRemoved = !_state.openTabs.some(item => item.name === _state.selectedFile);
      if (isOpenTabRemoved) {
        _state.selectedFile = startingTab;
        _state.selectedFileContent = _state.selectedFile ? getFileContent(_state.tree, startingTab) : "";
        _state.selectedLanguage = _state.selectedFile ? detectLanguage(_state.selectedFile) : LanguageEnum.md;
      }
    },
    closeSaved: (_state, action: PayloadAction<string | undefined>) => {
      const actionFile = action.payload;
      if (typeof actionFile === "undefined") return;
      _state.openTabs = _state.openTabs.filter(item => item.isEditing);
      if (_state.openTabs.length == 0) {
        _state.selectedFile = null;
        _state.selectedFileContent = null;
        return;
      }
      const isOpenTabRemoved = !_state.openTabs.some(item => item.name === _state.selectedFile);
      if (isOpenTabRemoved) {
        _state.selectedFile = actionFile;
        _state.selectedFileContent = _state.selectedFile ? getFileContent(_state.tree, actionFile) : "";
        _state.selectedLanguage = _state.selectedFile ? detectLanguage(_state.selectedFile) : LanguageEnum.md;
      }
    },
    closeAll: (_state, action: PayloadAction<void>) => {
      _state.openTabs = [];
      _state.selectedFile = null;
      _state.selectedFileContent = null;
    },
    archCodeGeneration: (state, action: PayloadAction<ArchProjectCode>) => {
      const { projectId, path, content } = action.payload;
      const segments = path.split("/");
      const fileName = segments.at(-1) || "";

      // walk tree
      let node: any = state.tree;
      for (let i = 0; i < segments.length - 1; i++) {
        const seg = segments[i];
        if (!node[seg]) node[seg] = {};
        node = node[seg] as FSData;
      }

      node[segments[segments.length - 1]] = content;
      state.selectedFile = path;
      state.selectedFileContent = content;
      state.selectedLanguage = detectLanguage(fileName);

      if (!state.openTabs.some(t => t.name === path)) {
        state.openTabs.push({ name: path, isEditing: false });
      }
    },

    archCodeRollBack: (state, action: PayloadAction<ISnapshotFile[]>) => {
      for (const file of action.payload) {
        const segments = file.path.split("/");
        let node = state.tree;
        const name = segments.at(-1)!;

        for (let i = 0; i < segments.length - 1; i++) {
          const seg = segments[i];
          if (!node[seg]) break;
          node = node[seg] as FSData;
        }

        if (file.action === "modify") {
          node[name] = file.content;
        }

        else if (file.action === "create") {
          delete node[name];
          cleanupEmptyDirs(state.tree, segments);
        }
      }
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

export const { setSelectedFile, resetFs, setFileLanguage, setFileContent,
   updateFileContent, setTree, switchTab,
    closeTab, setProjectName, setFileChange,
     renameFileName, deleteFile, setActivepath,
      newFile, newFolder, aiCodeGen, newFileWithContent,
       fileCreateUpdateFlow, closeOher, closeToRight,
        closeSaved, closeAll, archCodeGeneration, archCodeRollBack, deleteFolder } = fsSlice.actions;

export default fsSlice.reducer;
