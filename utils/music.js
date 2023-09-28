import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

const [audioFiles, setAudioFiles] = useState([]);

export const getMusicFiles = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();

  try {
    if (status === "granted") {
      // Permission granted, fetch audio files
      getAudioFiles();

      getAudioFiles().then((data) => {
        console.log("data", data);
      });
    }

    //   const musicDirectory = RNFS.ExternalStorageDirectoryPath + "/Music"; // Adjust the path to your music directory
    //   const files = await RNFS.readDir(musicDirectory);
    //   const musicFiles = files
    //     .filter((file) => file.isFile() && file.name.endsWith(".mp3")) // Filter only MP3 files
    //     .map((file) => ({
    //       id: file.name,
    //       title: file.name.replace(".mp3", ""),
    //       uri: "file://" + file.path,
    //     }));
    //   return musicFiles;
  } catch (error) {
    //   console.error("Error reading music files:", error);
    //   return [];
  }
};

const getAudioFiles = async () => {
  const media = await MediaLibrary.getAssetsAsync({
    mediaType: "audio",
  });

  setAudioFiles(media.assets);
};
