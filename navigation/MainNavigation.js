import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HomeScreen from "../screens/home";
import Favourite from "../screens/Favourite";
import ShazamKit from "../screens/ShazamKit";
import Header from "../components/Header";
import Player from "../components/Player";

import { usePlayback } from "../utils/PlaybackContext";

const Tab = createMaterialTopTabNavigator();

export default function Main() {
  const {
    isPlaying,
    setIsPlaying,
    currentSound,
    setSelectedSongIndex,
    selectedSongIndex,
    setCurrentSound,
    setCurrentSongName,
  } = usePlayback();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header />
      <Tab.Navigator
        initialRouteName="Local"
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused }) => {
            let label =
              route.name.charAt(0).toUpperCase() +
              route.name.slice(1).toLowerCase();
            return (
              <Text
                style={[
                  { color: focused ? "#0bd967" : "#f2f3f5" },
                  styles.tablabel,
                ]}
              >
                {label}
              </Text>
            );
          },
          tabBarIndicatorStyle: styles.tabIndicator,
          tabBarStyle: { backgroundColor: "#2a1c1b" },
        })}
      >
        <Tab.Screen name="Find" component={ShazamKit} />
        <Tab.Screen name="Local" component={HomeScreen} />
        <Tab.Screen name="Playlists" component={Favourite} />
      </Tab.Navigator>
      {currentSound && <Player />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tablabel: {
    fontWeight: "bold",
  },

  tabIndicator: {
    backgroundColor: "#2a1c1b",
    height: 1.5,
  },
});
