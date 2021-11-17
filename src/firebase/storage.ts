import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./app";

const storage = getStorage(app);

const uploadVideo = async (video: File, thumbnail: Blob, name: string) => {
  console.log("start upload");

  const videoStorageRef = ref(storage, `videos/${name}`);
  const thumbnailStorageRef = ref(storage, `thumbnails/${name}.png`);

  await uploadBytes(videoStorageRef, video);
  await uploadBytes(thumbnailStorageRef, thumbnail);

  const videoDownloadUrl = await getDownloadURL(videoStorageRef);
  const thumbnailDownloadUrl = await getDownloadURL(thumbnailStorageRef);

  return [videoDownloadUrl, thumbnailDownloadUrl];
};

export default uploadVideo;
