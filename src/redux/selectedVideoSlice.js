import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    video: { name: "" },
  },
  status: "idle",
};

export const selectedVideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setSelectedVideo: (state, action) => {
      state.value.video = action.payload;
    },
  },
});

export const { setSelectedVideo } = selectedVideoSlice.actions;

export const selectSelectedVideo = (state) => state.video.value.video;

export default selectedVideoSlice.reducer;
