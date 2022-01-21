import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  },
  reducers: {
    /*
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    */
    //Load User
    //Register User
    //Login User
    //Log out User
    //Clear errors in the state
  },
});

//export const { changeLanguage } = authSlice.actions;
export default authSlice.reducer;
