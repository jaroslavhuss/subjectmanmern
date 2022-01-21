import { createSlice } from "@reduxjs/toolkit";
export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alerts: [],
  },
  reducers: {
    setAlert: (state, action) => {
      state.alerts = action.payload;
    },
    removeAlert: (state) => {
      state.alerts = [];
    },
  },
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
