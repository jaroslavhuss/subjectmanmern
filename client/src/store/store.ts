import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../store/reducers/language";
import authReducer from "../store/reducers/auth";
import alertReducer from "./reducers/alert";
import subjectReducer from "./reducers/updateSubject";
import errorReducer from "./reducers/errorReducer";
export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
    alertState: alertReducer,
    updateSubject: subjectReducer,
    error: errorReducer,
  },
});
