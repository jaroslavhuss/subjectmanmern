import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
    loading: true,
    error: null,
    user: {} || null,
    subjects: [],
  },
  reducers: {
    authUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.loading = false;
      state.user = action.payload.user;
      state.subjects = action.payload.subjects;
    },
    authUserFailed: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.token = null;
      state.loading = true;
      state.user = {};
    },
  },
});

export const { authUserFailed, authUserSuccess } = authSlice.actions;
export default authSlice.reducer;
