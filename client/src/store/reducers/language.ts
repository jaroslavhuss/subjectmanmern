import { createSlice } from "@reduxjs/toolkit";
export const languageSlice = createSlice({
  name: "language",
  initialState: {
    language: "cs",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
