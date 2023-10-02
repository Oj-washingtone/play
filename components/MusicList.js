import React, { useState, useEffect, useContext } from "react";
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
import { usePlayback } from "../utils/PlaybackContext";
import { useNavigation } from "@react-navigation/native";

import Player from "./Player";
import BottonSheet from "./BottomSheet";
import PlayingSongScreen from "../screens/PlayingSongScreen";

export default function MusicList() {
  const [musicFiles, setMusicFiles] = useState([]);
  const [sound, setSound] = useState();
  const [sendToFavourite, setFavouriteIconForItem] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [songPaused, setSongPaused] = useState(false);

  const navigation = useNavigation();

  const {
    isPlaying,
    setIsPlaying,
    currentSound,
    setSelectedSongIndex,
    selectedSongIndex,
    setCurrentSound,
    setCurrentSongName,
  } = usePlayback();

  const soundObject = new Audio.Sound();

  const playMusic = async (music) => {
    if (isPlaying && music.id === selectedSongIndex) {
      // Navigate to the playing screen
      navigation.navigate("Playing Song Screen", {
        music,
      });
    } else {
      setSelectedSongIndex(music.id);

      if (isPlaying) {
        try {
          setIsPlaying(false);
          await currentSound.stopAsync();
        } catch (error) {
          console.error("Error stopping current sound:", error);
        }
      }

      // Load and play the selected music
      try {
        setIsPlaying(true);
        setCurrentSongName(music.filename);
        setCurrentSound(soundObject);

        // Load the selected music asynchronously
        await soundObject.loadAsync({ uri: music.uri });

        // Play the music immediately after loading
        await soundObject.playAsync();
      } catch (error) {
        console.error("Error playing music:", error);
      }
    }
  };

  // get music
  useEffect(() => {
    const getMusic = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const rootDirectory = "file:///";

        const media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
        });

        setMusicFiles(media.assets);
      }
    };

    getMusic();
  }, []);

  const togglePlayback = async () => {
    if (currentSound) {
      try {
        if (isPlaying) {
          // Pause the music
          await currentSound.pauseAsync();
        } else {
          // Start playing the music
          await currentSound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error handling play/pause:", error);
      }
    }
  };

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

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
              onLongPress={openBottomSheet}
              activeOpacity={0.6}
            >
              <Text
                style={[
                  styles.songName,
                  {
                    color:
                      item.id === selectedSongIndex && currentSound
                        ? "#0bd967"
                        : "#f2f3f5",
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

            {item.id === selectedSongIndex && currentSound && (
              <TouchableOpacity
                onPress={togglePlayback}
                style={styles.pauseBtn}
              >
                <MaterialCommunityIcons
                  name={isPlaying ? "pause" : "play"}
                  size={24}
                  color="#0bd967"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      <BottonSheet
        visible={bottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}
      />
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
