import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PlayingSongScreen({ route }) {
  //retrieve the data from the navigation
  const { music } = route.params;

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#261f1f", "#000", "#261f1f"]}
      style={styles.container}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.musicDisc}>
        <Image
          source={require("../assets/soundwave/music-disc.png")}
          style={{ width: 200, height: 200 }}
        />
      </View>

      {/* <Text style={styles.songName}>{music.filename} </Text> */}

      <Text style={styles.lyrics}>Could not find Lyrics for this song ...</Text>

      <TouchableOpacity
        style={[styles.playListButton, styles.floatingActionButton]}
      >
        <MaterialCommunityIcons
          name="playlist-music-outline"
          color="#fff"
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.shareButton, styles.floatingActionButton]}
      >
        <MaterialCommunityIcons name="share-variant" color="#fff" size={20} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },

  floatingActionButton: {
    position: "absolute",
    right: 10,
    width: 60,
    height: 60,
    backgroundColor: "#261f1f",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },

  shareButton: { bottom: 200 },

  playListButton: {
    bottom: 280,
  },

  musicDisc: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "40%",
    borderRadius: 10,
    backgroundColor: "#ccc",
    elevation: 10,
  },

  lyrics: {
    color: "#f2f3f5",
    fontSize: 16,
    marginTop: 50,
    fontWeight: "bold",
    width: "60%",
    textAlign: "center",
  },

  songName: {
    color: "#fff",
    fontSize: 12,
    marginTop: 20,
    width: "80%",
    textAlign: "center",
  },
});
