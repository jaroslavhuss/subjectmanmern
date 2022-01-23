import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
    loading: true,
    error: null,
    user: {} || null,
  },
  reducers: {
    authUserSuccess: (state, action) => {
      console.log("running aciton payload", action.payload);
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.loading = false;
      state.user = action.payload.user;
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
