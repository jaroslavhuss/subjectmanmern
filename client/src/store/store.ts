import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../store/reducers/language";
import authReducer from "../store/reducers/auth";
export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
  },
});
