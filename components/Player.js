import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { usePlayback } from "../utils/PlaybackContext";

export default function Player() {
  const {
    isPlaying,
    setIsPlaying,
    currentSound,
    currentSongName,
    setSelectedSongIndex,
    selectedSongIndex,
  } = usePlayback();

  // console.log("currentSound", currentSound);

  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [songPaused, setSongPaused] = useState(false);

  const togglePlayback = async () => {
    // Toggle playback and control the audio based on the global state
    if (currentSound) {
      try {
        if (isPlaying) {
          // Pause the music immediately
          await currentSound.pauseAsync();
          setSongPaused(true);
        } else {
          // Start playing the music immediately
          await currentSound.playAsync();
          setSongPaused(false);
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error handling play/pause:", error);
      }
    }
  };

  useEffect(() => {
    if (currentSound) {
      // Subscribe to audio playback updates to get the current position and duration
      const playbackStatusSubscription = currentSound.setOnPlaybackStatusUpdate(
        (status) => {
          if (status.isLoaded) {
            setPlaybackPosition(status.positionMillis);
            setPlaybackDuration(status.durationMillis);
          }
        }
      );

      return () => {
        if (playbackStatusSubscription) {
          playbackStatusSubscription.remove();
        }
      };
    }
  }, [currentSound]);

  const formatTime = (millis) => {
    const totalSeconds = millis / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const backwards5seconds = async () => {
    if (currentSound) {
      try {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          await currentSound.setPositionAsync(
            status.positionMillis - 5000,
            false
          );
        }
      } catch (error) {
        console.error("Error handling back 5 seconds:", error);
      }
    }
  };

  const forward5seconds = async () => {
    if (currentSound) {
      try {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          await currentSound.setPositionAsync(
            status.positionMillis + 5000,
            false
          );
        }
      } catch (error) {
        console.error("Error handling forward 5 seconds:", error);
      }
    }
  };

  return (
    <View style={styles.playing}>
      {currentSound && (
        <View style={styles.progress}>
          <Text style={{ color: "#fff" }}>{formatTime(playbackPosition)}</Text>
          <View
            style={{
              height: 2,
              backgroundColor: "#0bd967",
              // start player from width of 0 when else
              width: `${(playbackPosition / playbackDuration) * 100}%`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 70,
            }}
          />
        </View>
      )}

      <View style={styles.playingInfo}>
        <Text style={styles.songNameText}>{currentSongName}</Text>
      </View>
      <View style={styles.musicActions}>
        <View style={styles.audioIconWrapper}>
          {isPlaying && currentSound ? (
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
          <TouchableOpacity onPress={backwards5seconds}>
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
          <TouchableOpacity onPress={forward5seconds}>
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
    height: 140,
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
    bottom: 110,
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

  time: {
    color: "#fff",
  },

  // progressBar: {
  //   width: "80%",
  //   height: 2,
  //   backgroundColor: "#fff",
  // },

  playingInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  songName: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  artistName: {
    color: "#ccc",
    fontSize: 12,
  },

  progress: {
    width: "84%",
  },

  songNameText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    width: "70%",
    fontSize: 12,
  },
});
