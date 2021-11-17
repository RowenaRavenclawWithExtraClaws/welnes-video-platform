import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUploadIndicator,
  setUploadIndicator,
} from "../redux/uploadIndicatorSlice";

const CustomAlert = () => {
  const uploadStatus = useSelector(selectUploadIndicator);
  const dispatch = useDispatch();

  if (uploadStatus === "uploading")
    return (
      <Alert severity="info" color="info">
        Uploading the video...
      </Alert>
    );
  else if (uploadStatus === "uploaded")
    return (
      <Alert
        severity="success"
        color="success"
        onClose={() => dispatch(setUploadIndicator("nothing"))}
      >
        The video has been uploaded successfuly!
      </Alert>
    );

  return null;
};

export default CustomAlert;
