// src/components/TrackList.js
import React, { useState } from "react";
import TrackCard from "./TrackCard";
import Pagination from "./Pagination";
import SortFilter from "./SortFilter";
import "../styles/TrackList.css";

function TrackList({ tracks, setTracks, openEditModal, deleteTrack }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("title");
  const [filter, setFilter] = useState({ genre: "", artist: "" });

  // нормалізуємо фільтри
  const genreFilter = (filter.genre || "").toLowerCase().trim();
  const artistFilter = (filter.artist || "").toLowerCase().trim();

  const filtered = tracks
    .filter((t) =>
      genreFilter ? (t.genre || "").toLowerCase().includes(genreFilter) : true
    )
    .filter((t) =>
      artistFilter
        ? (t.artist || "").toLowerCase().includes(artistFilter)
        : true
    )
    .sort((a, b) => {
      const aVal = ((a[sortOrder] || "") + "").toLowerCase();
      const bVal = ((b[sortOrder] || "") + "").toLowerCase();
      return aVal.localeCompare(bVal);
    });

  // пагінація
  const start = (currentPage - 1) * perPage;
  const currentTracks = filtered.slice(start, start + perPage);

  return (
    <div className="track-list-container">
      <SortFilter
        setSortOrder={setSortOrder}
        setFilter={setFilter}
        currentFilter={filter}
      />

      <div className="track-list">
        {currentTracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            openEditModal={openEditModal}
            deleteTrack={deleteTrack}
          />
        ))}
      </div>

      <Pagination
        total={filtered.length}
        perPage={perPage}
        current={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default TrackList;
