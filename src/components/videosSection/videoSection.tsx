import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { getDocuments } from "../../firebase/firestore";
import { selectVideos, setVideos } from "../../redux/videosSlice";
import FetchIndicator from "../fetchIndicator";
import CustomPlayer from "./customPlayer";
import EmptyList from "./emptyList";

const VideoSection = () => {
  const [fetching, toggleFetching] = useState(true);
  const videos: Array<any> = useSelector(selectVideos);
  const dispatch = useDispatch();

  useEffect(() => {
    const getVideos = async () => {
      const videos = await getDocuments();

      dispatch(setVideos(videos));

      toggleFetching(false);
    };

    getVideos(); // eslint-disable-next-line
  }, []);

  if (fetching) return <FetchIndicator />;

  if (!videos.length) return <EmptyList />;

  return (
    <>
      <Row>
        {videos.map((video, indx) => (
          <Col key={indx} lg={3}>
            <Card sx={{ marginBottom: 5 }}>
              <CardContent>
                <CustomPlayer video={video} />
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default VideoSection;
