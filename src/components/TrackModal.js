import React, { useState, useEffect } from "react";
import "../styles/TrackModal.css";

function TrackModal({
  isVisible,
  setIsVisible,
  trackToEdit,
  setTrackToEdit,
  setTracks,
  genres,
}) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // заповнення полів, якщо ми в режимі редагування
  useEffect(() => {
    if (trackToEdit) {
      setTitle(trackToEdit.title);
      setArtist(trackToEdit.artist);
      setGenre(trackToEdit.genre);
      setCoverImage(trackToEdit.coverImage);
      setAudioFile(null);
      setVideoFile(null);
    } else {
      setTitle("");
      setArtist("");
      setGenre("");
      setCoverImage("");
      setAudioFile(null);
      setVideoFile(null);
    }
  }, [trackToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      id: trackToEdit ? trackToEdit.id : Date.now(),
      title,
      artist,
      genre,
      coverImage,
      // якщо завантажено файл — створюємо URL, інакше залишаємо старий
      audioUrl: audioFile
        ? URL.createObjectURL(audioFile)
        : trackToEdit?.audioUrl || "",
      videoUrl: videoFile
        ? URL.createObjectURL(videoFile)
        : trackToEdit?.videoUrl || "",
    };

    setTracks((prev) =>
      trackToEdit
        ? prev.map((t) => (t.id === newData.id ? newData : t))
        : [...prev, newData]
    );

    setTrackToEdit(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;
  return (
    <div className="track-modal-backdrop">
      <div className="track-modal">
        <h3>{trackToEdit ? "Edit Track" : "Create Track"}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Artist
            <input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </label>
          <label>
            Genre
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              <option value="">Select genre…</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Cover Image URL
            <input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
          </label>
          <label>
            Audio File (mp3, wav)
            <input
              type="file"
              accept="audio/mp3,audio/wav"
              onChange={(e) => setAudioFile(e.target.files[0])}
            />
          </label>
          <label>
            Video File (mp4, webm)
            <input
              type="file"
              accept="video/mp4,video/webm"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </label>
          <div className="modal-actions">
            <button
              type="button"
              onClick={() => {
                setTrackToEdit(null);
                setIsVisible(false);
              }}
            >
              Cancel
            </button>
            <button type="submit">{trackToEdit ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TrackModal;
