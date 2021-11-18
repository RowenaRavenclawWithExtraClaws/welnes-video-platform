import { Modal, Card, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecordRTCPromisesHandler } from "recordrtc";
import { addDocument, getDocuments } from "../../firebase/firestore";
import uploadVideo from "../../firebase/storage";
import { extractThumbnail } from "../../helpers";
import {
  selectCaptureModalState,
  setCaptureModalState,
} from "../../redux/captureModalSlice";
import {
  selectSelectedThumbnail,
  setSelectedThumbnail,
} from "../../redux/selectedThumbnailSlice";
import { setUploadIndicator } from "../../redux/uploadIndicatorSlice";
import { setVideos } from "../../redux/videosSlice";
import CustomButton from "./customButton";

const CaptureModal = () => {
  const open = useSelector(selectCaptureModalState);
  const thumbnail = useSelector(selectSelectedThumbnail);
  const capturedVideo = useRef(new File([], "ds"));
  const [title, setTitle] = useState("webcam video");

  const dispatch = useDispatch();

  const handleClose = () => dispatch(setCaptureModalState(false));

  const stopRecordWebCam = async (
    recorder: RecordRTCPromisesHandler,
    stream: MediaStream
  ) => {
    await recorder.stopRecording();
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  };

  const captureWebCam = () => {
    let videoElem = document.querySelector("#videoElement") as HTMLVideoElement;

    videoElem.controls = true;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          let recorder = new RecordRTCPromisesHandler(stream, {
            type: "video",
          });

          videoElem.srcObject = stream;

          recorder.startRecording();

          videoElem.onpause = async (_) => {
            await stopRecordWebCam(recorder, stream);

            extractThumbnail(
              recorder?.blob as File,
              dispatch,
              setSelectedThumbnail
            );

            capturedVideo.current = recorder.blob as File;
          };
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (open) setTimeout(() => captureWebCam(), 1000);
    // eslint-disable-next-line
  }, [open]);

  const handleVideoUploadAndUpdateList = async () => {
    let videoElem = document.querySelector("#videoElement") as HTMLVideoElement;

    if (!videoElem.paused)
      alert("you should pause the recording before the upload!");
    else if (!title) alert("you cannot upload the video without a title!");
    else {
      handleClose();

      dispatch(setUploadIndicator("uploading"));

      const [videoUrl, thumbnailUrl] = await uploadVideo(
        capturedVideo.current,
        thumbnail,
        title
      );

      await addDocument(videoUrl, thumbnailUrl, title);

      const videos = await getDocuments();

      dispatch(setVideos(videos));

      dispatch(setUploadIndicator("uploaded"));
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <video autoPlay id="videoElement" />
        <TextField
          error={title.length === 0}
          focused
          defaultValue={title}
          sx={{ width: "100%" }}
          required
          label="Title"
          onChange={(ev) => setTitle(ev.currentTarget.value)}
        />
        <div style={{ marginTop: 20 }}>
          <CustomButton
            label="Upload"
            extraStyles={{ height: 30 }}
            handler={handleVideoUploadAndUpdateList}
          />
          <CustomButton
            label="Cancel"
            extraStyles={{ float: "right", height: 30 }}
            handler={handleClose}
          />
        </div>
      </Card>
    </Modal>
  );
};

export default CaptureModal;
