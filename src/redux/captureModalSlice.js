import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isOpen: false,
  },
  status: "idle",
};

export const captureModalSlice = createSlice({
  name: "captureModalState",
  initialState,
  reducers: {
    setCaptureModalState: (state, action) => {
      state.value.isOpen = action.payload;
    },
  },
});

export const { setCaptureModalState } = captureModalSlice.actions;

export const selectCaptureModalState = (state) =>
  state.captureModalState.value.isOpen;

export default captureModalSlice.reducer;
