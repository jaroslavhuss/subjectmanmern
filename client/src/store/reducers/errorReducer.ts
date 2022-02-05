import { createSlice } from "@reduxjs/toolkit";
export const errorSlice = createSlice({
  name: "alert",
  initialState: {
    alerts: "",
    show: false,
  },
  reducers: {
    setError: (state, action) => {
      state.alerts = action.payload;
      state.show = true;
    },
    cleanError: (state) => {
      state.show = false;
      state.alerts = "";
    },
  },
});

export const { setError, cleanError } = errorSlice.actions;
export default errorSlice.reducer;
