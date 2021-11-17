import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isOpen: false,
  },
  status: "idle",
};

export const uploadModalSlice = createSlice({
  name: "uploadModalState",
  initialState,
  reducers: {
    setUploadModalState: (state, action) => {
      state.value.isOpen = action.payload;
    },
  },
});

export const { setUploadModalState } = uploadModalSlice.actions;

export const selectuploadModalState = (state) =>
  state.uploadModalState.value.isOpen;

export default uploadModalSlice.reducer;
