import React from "react";
import "../styles/TrackCard.css";

function TrackCard({ track, openEditModal, deleteTrack }) {
  return (
    <div className="track-card">
      <img
        src={track.coverImage}
        alt={track.title}
        className="track-card__cover"
      />

      <div className="track-card__info">
        <h4>{track.title}</h4>
        <p>
          {track.artist} · {track.genre}
        </p>
      </div>

      <div className="track-card__media">
        {track.audioUrl && (
          <audio controls src={track.audioUrl}>
            Your browser does not support audio
          </audio>
        )}
        {track.videoUrl && (
          <video controls width="200" src={track.videoUrl}>
            Your browser does not support video
          </video>
        )}
      </div>

      <div className="track-card__actions">
        <button onClick={() => openEditModal(track)}>Edit</button>
        <button onClick={() => deleteTrack(track.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TrackCard;
