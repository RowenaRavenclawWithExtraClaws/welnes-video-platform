import { useDispatch } from "react-redux";
import { selectVideo } from "../../helpers";
import { setCaptureModalState } from "../../redux/captureModalSlice";
import CustomButton from "./customButton";

const UploadSection = () => {
  const dispatch = useDispatch();

  return (
    <div className="upload-section">
      <CustomButton
        label="Select"
        extraStyles={{ marginRight: "10%" }}
        handler={() => selectVideo(dispatch)}
      />
      <CustomButton
        label="Capture"
        extraStyles={{ marginLeft: "10%" }}
        handler={() => dispatch(setCaptureModalState(true))}
      />
    </div>
  );
};

export default UploadSection;
