import { createSlice } from "@reduxjs/toolkit";
export const subjectSlice = createSlice({
  name: "subjectupdate",
  initialState: {
    subjectToBeUpdated: {},
  },
  reducers: {
    updateSubject: (state, action) => {
      console.log(action.payload);
      state.subjectToBeUpdated = action.payload;
    },
  },
});

export const { updateSubject } = subjectSlice.actions;
export default subjectSlice.reducer;
