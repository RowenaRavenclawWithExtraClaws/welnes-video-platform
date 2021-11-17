import { Typography } from "@mui/material";

const EmptyList = () => {
  return (
    <div
      style={{
        textAlign: "center",
        height: window.innerHeight,
      }}
    >
      <Typography variant="h5" sx={{ marginTop: "20%" }}>
        You haven't uploaded any videos
      </Typography>
    </div>
  );
};

export default EmptyList;
