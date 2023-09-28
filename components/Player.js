import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);


  const togglePlayback = async () => {
    setIsPlaying(!isPlaying);
    // if (sound) {
    //   if (isPlaying) {
    //     await sound.pauseAsync();
    //   } else {
    //     await sound.playAsync();
    //   }
    //   setIsPlaying(!isPlaying);
    // }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.playing}>
      <View style={styles.playingInfo}>
        <Text style={{ color: "#fff", textAlign: "center", marginBottom: 10 }}>
          Song name
        </Text>
      </View>
      <View style={styles.musicActions}>
        <View style={styles.audioIconWrapper}>
          {isPlaying ? (
            <Image
              source={require("../assets/soundwave/wave.gif")}
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <MaterialCommunityIcons
              name="music-note"
              size={24}
              color="#0bd967"
            />
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="skip-previous"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="skip-backward"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={togglePlayback}
            style={styles.togglePlayback}
            activeOpacity={1}
          >
            <MaterialCommunityIcons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="skip-forward"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="skip-next" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRepeat(!repeat)}>
            {repeat ? (
              <MaterialCommunityIcons name="replay" size={24} color="#0bd967" />
            ) : (
              <MaterialCommunityIcons name="replay" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Floating action button */}
      <TouchableOpacity
        style={[styles.floatingActionButton]}
        onPress={() => setShuffle(!shuffle)}
        activeOpacity={1}
      >
        {shuffle ? (
          <MaterialCommunityIcons
            name="shuffle-variant"
            size={24}
            color="#0bd967"
          />
        ) : (
          <MaterialCommunityIcons
            name="shuffle-variant"
            size={24}
            color="#fff"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  playing: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#000",
    color: "#fff",

    padding: 5,
    elevation: 10,
  },

  musicActions: {
    display: "flex",
    height: 60,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
  },

  audioIconWrapper: {
    width: 60,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },

  togglePlayback: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 50,
  },

  togglePlayback: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#0bd967",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },

  floatingActionButton: {
    position: "absolute",
    bottom: 70,
    right: 10,
    width: 60,
    height: 60,
    backgroundColor: "#000",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
});
