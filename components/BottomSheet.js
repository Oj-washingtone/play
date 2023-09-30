import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function BottonSheet({ visible, onRequestClose }) {
  const [permissionGranted, setPermissionGranted] = useState(false);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Jplayer needs permission to access your media library.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    width: "100%",
    height: "50%",
    backgroundColor: "#000",
    // make it appear as a card
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  modalText: {
    color: "#fff",
    fontSize: 18,
  },

  button: {
    backgroundColor: "#0bd967",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
