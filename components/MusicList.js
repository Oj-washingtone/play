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
import * as MediaLibrary from "expo-media-library";
//import { getMusicFiles } from "../utils/music"; // Import the updated helper function

import Player from "./Player";

export default function MusicList() {
  const [musicFiles, setMusicFiles] = useState([]);
  const [sound, setSound] = useState();
  const [sendToFavourite, setFavouriteIconForItem] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = async (music) => {
    setSelectedSongIndex(music.id);

    if (currentSound) {
      try {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await currentSound.stopAsync();
          setIsPlaying(false);
        }
      } catch (error) {
        console.error("Error stopping current sound:", error);
      }
    }

    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync({ uri: music.uri });
      await soundObject.playAsync();
      // You can also use await soundObject.setIsLoopingAsync(true); if you want to loop the music.

      // Store the reference to the currently playing sound
      setCurrentSound(soundObject);
      setIsPlaying(true);
    } catch (error) {
      // Handle any errors that occurred during loading or playing the music.
      console.error("Error playing music:", error);
    }
  };

  // pause current playing music
  const pauseMusic = async () => {
    if (currentSound) {
      try {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await currentSound.pauseAsync();
          setIsPlaying(false);
        }
      } catch (error) {
        console.error("Error stopping current sound:", error);
      }
    }
  };

  // get music
  useEffect(() => {
    const getMusic = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
        });

        setMusicFiles(media.assets);
      }
    };

    getMusic();
  }, []);

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
              onPress={() => playMusic(item)}
              style={styles.musicNameWrapper}
              onLongPress={() => console.log("Long press")}
              activeOpacity={0.6}
            >
              <Text
                style={[
                  styles.songName,
                  {
                    color:
                      item.id === selectedSongIndex ? "#0bd967" : "#f2f3f5",
                  },
                ]}
              >
                {item.filename}
              </Text>
              <Text style={styles.artistName}>Artist</Text>
            </TouchableOpacity>
            <View style={styles.musicDuration}>
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={15}
                color="#ccc"
              />
              <Text style={styles.duration}>
                {`${Math.floor(item.duration / 60)}:${(item.duration % 60)
                  .toFixed(0)
                  .padStart(2, "0")}`}
              </Text>
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

            {
              // add a button only for the selected song
              item.id === selectedSongIndex && isPlaying && currentSound && (
                <TouchableOpacity
                  onPress={
                    isPlaying ? () => pauseMusic() : () => playMusic(item)
                  }
                  style={styles.pauseBtn}
                >
                  {currentSound && isPlaying ? (
                    <MaterialCommunityIcons
                      name="pause"
                      size={24}
                      color="#0bd967"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="play"
                      size={24}
                      color="#0bd967"
                    />
                  )}
                </TouchableOpacity>
              ) // end of the button
            }
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
    width: 40,
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 10,
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

  pauseBtn: {
    marginLeft: 15,
  },
});
