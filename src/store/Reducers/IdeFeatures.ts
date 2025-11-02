import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IdeFeatures {
  codeCompletion: boolean;
}

const loadFromLocalStorage = (): IdeFeatures => {
  try {
    const saved = localStorage.getItem("Bricks:Ide-features");
    return saved ? JSON.parse(saved) : { codeCompletion: false };
  } catch {
    return { codeCompletion: false };
  }
};

const saveToLocalStorage = (state: IdeFeatures) => {
  try {
    localStorage.setItem("Bricks:Ide-features", JSON.stringify(state));
  } catch {
    // ignore storage write errors (e.g., quota exceeded)
  }
};

const initialState: IdeFeatures = loadFromLocalStorage();

const IdeFeaturesSlice = createSlice({
  name: "ide-features",
  initialState,
  reducers: {
    toggleCodeCompletion: (state, action: PayloadAction<boolean>) => {
      state.codeCompletion = action.payload;
      saveToLocalStorage(state);
    },
  },
});

export default IdeFeaturesSlice.reducer;
export const { toggleCodeCompletion } = IdeFeaturesSlice.actions;
