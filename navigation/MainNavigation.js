import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HomeScreen from "../screens/home";
import Favourite from "../screens/Favourite";
import ShazamKit from "../screens/ShazamKit";

const Tab = createMaterialTopTabNavigator();

export default function Main() {
  return (
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
  );
}

const styles = StyleSheet.create({
  tablabel: {
    // fontSize: 16,
    fontWeight: "bold",
  },

  tabIndicator: {
    backgroundColor: "#2a1c1b",
    height: 1.5,
  },
});
