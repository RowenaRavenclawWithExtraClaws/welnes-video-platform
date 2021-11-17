import { Typography } from "@mui/material";
import "./styles/App.css";
import "./styles/_preloader.scss";
import CustomAlert from "./components/customAlert";
import CaptureModal from "./components/uploadSection/captureModal";
import UploadModal from "./components/uploadSection/uploadModal";
import UploadSection from "./components/uploadSection/uploadSection";
import VideoSection from "./components/videosSection/videoSection";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ flex: 1, fontWeight: "bold" }}
        >
          Welnes Video Platform
        </Typography>
        <UploadSection />
      </div>
      <CustomAlert />
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          height: window.outerHeight,
        }}
      >
        <VideoSection />
      </div>
      <UploadModal />
      <CaptureModal />
    </div>
  );
}

export default App;
