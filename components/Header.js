import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <MaterialCommunityIcons name="music-circle" size={60} color="#0bd967" />
        <Text style={styles.logoText}>PlayMs</Text>
      </View>

      <View style={styles.search}>
        {/* Search input */}
        {/* <TextInput
          style={{
            backgroundColor: "#fff",
            width: 200,
            height: 40,
            borderRadius: 20,
            paddingLeft: 20,
          }}
          placeholder="Search"
        /> */}

        <TouchableOpacity>
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
    marginVertical: 10,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 10,
    padding: 20,
    pardingTop: 50,
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
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
