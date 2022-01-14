import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../store/reducers/language";
export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});
