import RNFS from "react-native-fs";

export const getMusicFiles = async () => {
  try {
    const musicDirectory = RNFS.ExternalStorageDirectoryPath + "/Music"; // Adjust the path to your music directory
    const files = await RNFS.readDir(musicDirectory);

    const musicFiles = files
      .filter((file) => file.isFile() && file.name.endsWith(".mp3")) // Filter only MP3 files
      .map((file) => ({
        id: file.name,
        title: file.name.replace(".mp3", ""),
        uri: "file://" + file.path,
      }));

    return musicFiles;
  } catch (error) {
    console.error("Error reading music files:", error);
    return [];
  }
};
