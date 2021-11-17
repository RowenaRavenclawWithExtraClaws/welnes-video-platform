import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "./app";

const database = getFirestore(app);

export const addDocument = async (
  videoUrl: string,
  thumbnailUrl: string,
  title: string
) => {
  try {
    await addDoc(collection(database, "videos"), {
      thumbnail_url: thumbnailUrl,
      video_url: videoUrl,
      title: title,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDocuments = async () => {
  let videos: any = [];

  const videoData = await getDocs(collection(database, "videos"));

  videoData.forEach((doc) => videos.push(doc.data()));

  return videos;
};
