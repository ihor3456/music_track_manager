import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TrackList from "./components/TrackList";
import TrackModal from "./components/TrackModal";
import "./App.css";

// динамічно імпортуємо всі файли з folder src/tracks
function loadAllTracksFromSrc() {
  const req = require.context("./tracks", false, /\.json$/);
  return req.keys().map((key) => req(key).default || req(key));
}

function App() {
  const [tracks, setTracks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trackToEdit, setTrackToEdit] = useState(null);

  // 1) genres.json
  useEffect(() => {
    fetch("/genres.json")
      .then((r) => r.json())
      .then(setGenres)
      .catch(console.error);
  }, []);

  // 2) tracks — localStorage або src/tracks/*.json
  useEffect(() => {
    const stored = localStorage.getItem("tracks");
    if (stored) {
      try {
        const arr = JSON.parse(stored);
        if (Array.isArray(arr) && arr.length > 0) {
          setTracks(arr);
          return;
        }
      } catch {}
    }
    // якщо нічого в LS — беремо з папки
    const all = loadAllTracksFromSrc();
    setTracks(all);
  }, []);

  // 3) синхронізуємо LS після будь-яких змін
  useEffect(() => {
    localStorage.setItem("tracks", JSON.stringify(tracks));
  }, [tracks]);

  const openCreateModal = () => {
    setTrackToEdit(null);
    setIsModalVisible(true);
  };

  const openEditModal = (t) => {
    setTrackToEdit(t);
    setIsModalVisible(true);
  };

  const deleteTrack = (id) => {
    setTracks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="App">
      <Header openCreateModal={openCreateModal} />

      <TrackList
        tracks={tracks}
        setTracks={setTracks}
        openEditModal={openEditModal}
        deleteTrack={deleteTrack}
      />

      <TrackModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        trackToEdit={trackToEdit}
        setTrackToEdit={setTrackToEdit}
        setTracks={setTracks}
        genres={genres}
      />
    </div>
  );
}

export default App;

