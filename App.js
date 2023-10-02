import React, { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

import AppStack from "./navigation/StackNavigation";
import { PlaybackProvider, usePlayback } from "./utils/PlaybackContext";

export default function App() {
  NavigationBar.setButtonStyleAsync("dark");

  const [permission, setPermission] = useState({});
  const [isPermissionModalVisible, setIsPermissionModalVisible] =
    useState(false);

  // request permission to access media library
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    setPermission(permission);
  };

  useEffect(() => {
    getPermission();

    if (!permission.granted) {
      setIsPermissionModalVisible(true);
    }
  }, []);

  return (
    <PlaybackProvider>
      <AppStack />
    </PlaybackProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#000",
  },

  content: {
    flex: 1,
    width: "100%",
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
