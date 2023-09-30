import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import screens
import Main from "./MainNavigation";
import PlayingSongScreen from "../screens/PlayingSongScreen";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Playing Song Screen"
          component={PlayingSongScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
