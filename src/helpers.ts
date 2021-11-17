import { setSelectedVideo } from "./redux/selectedVideoSlice";
import { setSelectedThumbnail } from "./redux/selectedThumbnailSlice";
import { setUploadModalState } from "./redux/uploadModalSlice";

export const selectVideo = (dispatch: any) => {
  let input = document.createElement("input");

  input.type = "file";
  input.accept = "video/mp4,video/x-m4v,video/*";

  input.onchange = async (_) => {
    const tempBlob: Array<BlobPart> = [];
    const videoFile = input.files ? input.files[0] : new File(tempBlob, "");

    await extractThumbnail(videoFile, dispatch, setSelectedThumbnail);

    dispatch(setSelectedVideo(videoFile));

    dispatch(setUploadModalState(true));
  };

  input.click();
};

export const extractThumbnail = async (
  video: File,
  dispatch: any,
  setter: any
) => {
  let url = URL.createObjectURL(video);
  let videoElem = document.createElement("video");

  videoElem.src = url;
  await videoElem.play();

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const newBlob = blob?.slice(0, blob.size, "image/png");

      dispatch(setter(newBlob));

      videoElem.pause();
    }, "image/png");
  }
};

export const bytesToMB = (bytes: number) => (bytes / 1000000).toFixed(2);
