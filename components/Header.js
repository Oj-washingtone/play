import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        {/* <MaterialCommunityIcons name="music-circle" size={40} color="#0bd967" /> */}
        {/* Logo image */}
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={styles.logoText}>JPlayer</Text>
      </View>

      <View style={styles.search}>
        {/* Show search only when the true */}
        {showSearch && (
          <TextInput style={styles.searchInput} placeholder="Search" />
        )}

        <TouchableOpacity
          onPress={() => setShowSearch(!showSearch)}
          activeOpacity={0.5}
        >
          <MaterialCommunityIcons name="magnify" size={25} color="#0bd967" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#2a1c1b",
    elevation: 10,
    padding: 20,
    pardingTop: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },

  search: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#330101",
    padding: 7,
    borderRadius: 20,
  },

  searchInput: {
    width: "50%",
    color: "#ccc",
    paddingHorizontal: 10,
  },
});
