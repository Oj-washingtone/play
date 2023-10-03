import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import { usePlayback } from "../utils/PlaybackContext";
import { useNavigation } from "@react-navigation/native";
import BottonSheet from "./BottomSheet";

// music Item component
import MusicItem from "./MusicItem";

export default function MusicList() {
  const [musicFiles, setMusicFiles] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const navigation = useNavigation();

  // get music
  useEffect(() => {
    const getMusic = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
          // first: 9999,
        });

        const filteredMedia = media.assets.filter(
          (item) => item.duration >= 30
        );

        setMusicFiles(filteredMedia);
      }
    };

    getMusic();
  }, []);

  const MemoizedMusicItem = React.memo(MusicItem);

  return (
    <View style={styles.musicListWrapper}>
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MemoizedMusicItem item={item} />}
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
      />

      <BottonSheet
        visible={bottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  musicItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#03540d",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  musicListWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1,
  },
});
