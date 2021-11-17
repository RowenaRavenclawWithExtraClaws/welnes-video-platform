import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    indicator: "nothing",
  },
  status: "idle",
};

export const uploadIndicatorSlice = createSlice({
  name: "indicator",
  initialState,
  reducers: {
    setUploadIndicator: (state, action) => {
      state.value.indicator = action.payload;
    },
  },
});

export const { setUploadIndicator } = uploadIndicatorSlice.actions;

export const selectUploadIndicator = (state) => state.indicator.value.indicator;

export default uploadIndicatorSlice.reducer;
