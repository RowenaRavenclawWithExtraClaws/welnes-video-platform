import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    videos: [],
  },
  status: "idle",
};

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.value.videos = action.payload;
    },
  },
});

export const { setVideos } = videosSlice.actions;

export const selectVideos = (state) => state.videos.value.videos;

export default videosSlice.reducer;
