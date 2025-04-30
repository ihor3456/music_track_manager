import React from "react";
import "../styles/Header.css";

function Header({ openCreateModal }) {
  return (
    <header className="header">
      <h1 className="header__title">Music Manager</h1>
      <button
        onClick={openCreateModal}
        className="header__create-btn"
        data-testid="create-track-button"
      >
        Create Track
      </button>
    </header>
  );
}

export default Header;
