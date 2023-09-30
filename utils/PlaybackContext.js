import React, { createContext, useContext, useState } from "react";

// Create a context for playback control
const PlaybackContext = createContext();

export function PlaybackProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [currentSongName, setCurrentSongName] = useState(null);
  const [musicListManager, setMusicListInManager] = useState([]);

  // Add other playback-related state and functions as needed

  return (
    <PlaybackContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentSound,
        setCurrentSound,
        selectedSongIndex,
        setSelectedSongIndex,
        currentSongName,
        setCurrentSongName,
        // Add other playback-related state and functions as needed
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  return useContext(PlaybackContext);
}
