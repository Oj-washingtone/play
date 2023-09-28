import React, { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import MusicList from "./components/MusicList";
import Player from "./components/Player";
import Header from "./components/Header";

export default function App() {
  NavigationBar.setButtonStyleAsync("dark");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LinearGradient
        // Button Linear Gradient
        colors={["#261f1f", "#000", "#261f1f"]}
        style={styles.container}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Header />
        <MusicList />
        <Player />

        {/* Floating action button */}
        <TouchableOpacity style={styles.floatingActionButton}>
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    // paddingTop: 50,
    backgroundColor: "#000",
  },

  playing: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    padding: 5,
    elevation: 10,
    flexDirection: "row",
  },

  audioIconWrapper: {
    width: 50,
    height: "100%",
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  actionsAndPlayIndicator: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
});
