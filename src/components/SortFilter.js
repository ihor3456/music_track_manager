import React from "react";
import "../styles/SortFilter.css";

function SortFilter({ setSortOrder, setFilter, currentFilter }) {
  return (
    <div className="sort-filter">
      <label>
        Sort by:
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="genre">Genre</option>
        </select>
      </label>
      <label>
        Genre:
        <input
          type="text"
          placeholder="Filter genre"
          value={currentFilter.genre}
          onChange={(e) => setFilter((f) => ({ ...f, genre: e.target.value }))}
        />
      </label>
      <label>
        Artist:
        <input
          type="text"
          placeholder="Filter artist"
          value={currentFilter.artist}
          onChange={(e) => setFilter((f) => ({ ...f, artist: e.target.value }))}
        />
      </label>
    </div>
  );
}

export default SortFilter;
