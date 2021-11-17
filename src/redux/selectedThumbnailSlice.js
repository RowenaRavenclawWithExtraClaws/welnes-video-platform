import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    thumbnail: {},
  },
  status: "idle",
};

export const selectedThumbnailSlice = createSlice({
  name: "thumbnail",
  initialState,
  reducers: {
    setSelectedThumbnail: (state, action) => {
      state.value.thumbnail = action.payload;
    },
  },
});

export const { setSelectedThumbnail } = selectedThumbnailSlice.actions;

export const selectSelectedThumbnail = (state) =>
  state.thumbnail.value.thumbnail;

export default selectedThumbnailSlice.reducer;
