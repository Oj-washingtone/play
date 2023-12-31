import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import MusicList from "../components/MusicList";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#261f1f", "#000", "#261f1f"]}
        style={styles.container}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <MusicList />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
