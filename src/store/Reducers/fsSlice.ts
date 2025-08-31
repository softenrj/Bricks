import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { wc } from "./webContainer";
import { getFSTree } from "@/service/fsWalker";
import { LanguageEnum } from "@/feature/LanguageEnum";

export type FSData = { [key: string]: string | FSData };

interface FSState {
  tree: FSData;
  selectedFile: string | null;
  selectedFileContent: string | null;
  selectedLanguage: typeof LanguageEnum[keyof typeof LanguageEnum];
}

const initialState: FSState = {
  tree: {},
  selectedFile: null,
  selectedFileContent: "",
  selectedLanguage: LanguageEnum.md,
};

// Async: fetch FS from WebContainer
export const fetchFsTree = createAsyncThunk("fs/fetchTree", async () => {
  return await getFSTree(".");
});

// Async: write a file (updates container + redux)
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
      state.selectedFile = action.payload;

      // Load content from FS tree automatically
      const segments = action.payload.split("/");
      let node: any = state.tree;
      for (const seg of segments) {
        if (!node) break;
        node = node[seg];
      }
      state.selectedFileContent = typeof node === "string" ? node : "";
    },
    setFileLanguage: (state, action: PayloadAction<typeof LanguageEnum[keyof typeof LanguageEnum]>) => {
      state.selectedLanguage = action.payload;
    },
    setFileContent: (state, action: PayloadAction<string>) => {
        state.selectedFileContent = action.payload
    },
    // ✅ New action: updateFileContent
    updateFileContent: (state, action: PayloadAction<{ path: string; content: string }>) => {
      const { path, content } = action.payload;
      state.selectedFileContent = content;

      // Optional: update tree structure
      const segments = path.split("/");
      let node: any = state.tree;
      for (let i = 0; i < segments.length - 1; i++) {
        node = node[segments[i]] as FSData;
      }
      node[segments[segments.length - 1]] = content;

      // Write to WebContainer FS asynchronously
      if (wc) {
        wc.fs.writeFile(path, content);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFsTree.fulfilled, (state, action) => {
      state.tree = action.payload;
    });
    builder.addCase(writeFile.fulfilled, (state, action) => {
      const { path, content } = action.payload;
      if (state.selectedFile === path) {
        state.selectedFileContent = atob(content);
      }
    });
  },
});

export const { setSelectedFile, setFileLanguage, updateFileContent, setFileContent } = fsSlice.actions;
export default fsSlice.reducer;
