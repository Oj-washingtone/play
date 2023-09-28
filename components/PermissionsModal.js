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

export default function PermissionModal({ visible, onRequestClose }) {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const getMediaPermission = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    onRequestClose();
  };

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

          {/* Allow button */}
          <TouchableOpacity style={styles.button} onPress={getMediaPermission}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Allow</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onRequestClose}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    height: "50%",
    backgroundColor: "#120504",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#fff",
  },
});
