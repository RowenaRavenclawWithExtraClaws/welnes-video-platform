import { Modal, Card, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDocument, getDocuments } from "../../firebase/firestore";
import uploadVideo from "../../firebase/storage";
import { bytesToMB } from "../../helpers";
import { selectSelectedThumbnail } from "../../redux/selectedThumbnailSlice";
import { selectSelectedVideo } from "../../redux/selectedVideoSlice";
import { setUploadIndicator } from "../../redux/uploadIndicatorSlice";
import {
  selectuploadModalState,
  setUploadModalState,
} from "../../redux/uploadModalSlice";
import { setVideos } from "../../redux/videosSlice";
import CustomButton from "./customButton";

const UploadModal = () => {
  const open = useSelector(selectuploadModalState);
  const selectedVideo = useSelector(selectSelectedVideo);
  const selectedThumbnail = useSelector(selectSelectedThumbnail);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => dispatch(setUploadModalState(false));

  const handleVideoUploadAndUpdateList = async () => {
    if (!title.length) alert("you cannot upload the video without a title!");
    else {
      handleClose();

      dispatch(setUploadIndicator("uploading"));

      const [videoUrl, thumbnailUrl] = await uploadVideo(
        selectedVideo,
        selectedThumbnail,
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

  useEffect(() => {
    setTitle(selectedVideo.name);
  }, [selectedVideo, selectedThumbnail]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <TextField
          error={title.length === 0}
          focused
          sx={{ width: "100%" }}
          required
          label="Title"
          defaultValue={selectedVideo.name}
          onChange={(ev) => setTitle(ev.currentTarget.value)}
        />
        <div style={{ marginTop: 10 }}>
          <Typography variant="subtitle1">
            type: {selectedVideo.type}
          </Typography>
          <Typography variant="subtitle1">
            size: {bytesToMB(selectedVideo.size)} MB
          </Typography>
        </div>
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

export default UploadModal;
