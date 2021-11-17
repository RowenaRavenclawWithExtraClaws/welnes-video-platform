import { Typography } from "@mui/material";
import ReactPlayer from "react-player";

const CustomPlayer = (props: { video: any }) => {
  return (
    <>
      <ReactPlayer
        light={props.video.thumbnail_url}
        controls
        width="100%"
        height={200}
        playing
        url={props.video.video_url}
      />
      <Typography variant="h6" gutterBottom sx={{ marginTop: 1 }}>
        {props.video.title}
      </Typography>
    </>
  );
};

export default CustomPlayer;
