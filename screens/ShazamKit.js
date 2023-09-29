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
import { LinearGradient } from "expo-linear-gradient";

export default function ShazamKit() {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#261f1f", "#000", "#261f1f"]}
        style={styles.container}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text>Shazam music</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
