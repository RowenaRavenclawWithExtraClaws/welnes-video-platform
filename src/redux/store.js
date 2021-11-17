import { configureStore } from "@reduxjs/toolkit";
import uploadModalReducer from "./uploadModalSlice";
import captureModalReducer from "./captureModalSlice";
import selectedVideoReducer from "./selectedVideoSlice";
import selectedThumbnailReducer from "./selectedThumbnailSlice";
import uploadIndicatorReducer from "./uploadIndicatorSlice";
import videosReducer from "./videosSlice";

const store = configureStore({
  reducer: {
    uploadModalState: uploadModalReducer,
    captureModalState: captureModalReducer,
    video: selectedVideoReducer,
    thumbnail: selectedThumbnailReducer,
    indicator: uploadIndicatorReducer,
    videos: videosReducer,
  },
});

export default store;
