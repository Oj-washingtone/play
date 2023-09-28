import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "react-native-vector-icons";

// import { getMusicFiles } from "../utils/music"; // Import the updated helper function

import Player from "./Player";

export default function FavList() {
  const [musicFiles, setMusicFiles] = useState([
    // use dummy data for now
    {
      id: "1",
      title: "Song 1",
      uri: "file:///storage/emulated/0/Music/Song1.mp3",
    },
    {
      id: "2",
      title: "Song 2",
      uri: "file:///storage/emulated/0/Music/Song2.mp3",
    },
    {
      id: "3",
      title: "Song 3",
      uri: "file:///storage/emulated/0/Music/Song3.mp3",
    },
    {
      id: "4",
      title: "Song 4",
      uri: "file:///storage/emulated/0/Music/Song4.mp3",
    },
    {
      id: "5",
      title: "Song 5",
      uri: "file:///storage/emulated/0/Music/Song5.mp3",
    },
    {
      id: "6",
      title: "Song 6",
      uri: "file:///storage/emulated/0/Music/Song6.mp3",
    },
    {
      id: "7",
      title: "Song 7",
      uri: "file:///storage/emulated/0/Music/Song7.mp3",
    },
    {
      id: "8",
      title: "Song 8",
      uri: "file:///storage/emulated/0/Music/Song8.mp3",
    },
    {
      id: "9",
      title: "Song 9",
      uri: "file:///storage/emulated/0/Music/Song9.mp3",
    },

    {
      id: "10",
      title: "Song 10",
      uri: "file:///storage/emulated/0/Music/Song10.mp3",
    },
    {
      id: "11",
      title: "Song 11",
      uri: "file:///storage/emulated/0/Music/Song11.mp3",
    },
    {
      id: "12",
      title: "Song 12",
      uri: "file:///storage/emulated/0/Music/Song12.mp3",
    },
    {
      id: "13",
      title: "Song 13",
      uri: "file:///storage/emulated/0/Music/Song13.mp3",
    },
    {
      id: "14",
      title: "Song 14",
      uri: "file:///storage/emulated/0/Music/Song13.mp3",
    },

    {
      id: "15",
      title: "Song 15",
      uri: "file:///storage/emulated/0/Music/Song13.mp3",
    },
  ]);
  const [sound, setSound] = useState();
  const [sendToFavourite, setFavouriteIconForItem] = useState(false);

  //   useEffect(() => {
  //     const fetchMusic = async () => {
  //       const music = await getMusicFiles();
  //       setMusicFiles(music);
  //     };

  //     fetchMusic();
  //   }, []);

  //   const playMusic = async (music) => {
  //     const { sound } = await Audio.Sound.createAsync(
  //       { uri: music.uri },
  //       { shouldPlay: true }
  //     );
  //     setSound(sound);
  //   };

  return (
    <View style={styles.musicListWrapper}>
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            // onPress={() => playMusic(item)}
            style={styles.musicItem}
          >
            <View style={styles.musicImage}>
              <MaterialCommunityIcons
                name="music-note"
                size={24}
                color="white"
              />
            </View>
            <TouchableOpacity
              // onPress={() => playMusic(item)}
              style={styles.musicNameWrapper}
              onLongPress={() => console.log("Long press")}
            >
              <Text style={styles.songName}>{item.title}</Text>
              <Text style={styles.artistName}>Artist</Text>
            </TouchableOpacity>
            <View style={styles.musicDuration}>
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={15}
                color="#ccc"
              />
              <Text style={styles.duration}>3:00</Text>
            </View>
            <TouchableOpacity
            // onPress={() => playMusic(item)}
            >
              {}
              <MaterialCommunityIcons
                name="heart-outline"
                size={20}
                color="#ccc"
              />
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* <Player /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  musicItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#03540d",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  musicListWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1,
  },

  musicDuration: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 20,
  },

  duration: {
    marginLeft: 5,
    fontSize: 12,
    color: "#ccc",
  },

  musicImage: {
    width: 50,
    height: 50,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  musicNameWrapper: {
    flex: 1,
    marginRight: 10,
    height: "100%",
    paddingVertical: 5,
  },

  songName: {
    fontSize: 15,
    color: "#f2f3f5",
    fontWeight: "bold",
  },

  artistName: {
    fontSize: 12,
    color: "#ccc",
  },
});
