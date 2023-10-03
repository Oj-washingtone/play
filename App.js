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
