import React, { useContext, useState } from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import GlobalStoreContext from "../store";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function SongCard({ song, index }) {
  const primaryText = `${index + 1}. ${song.title} `;
  const { store } = useContext(GlobalStoreContext);
  const [draggedTo, setDraggedTo] = useState(0);

  function handleDragStart(event) {
    event.dataTransfer.setData("song", index);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    setDraggedTo(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setDraggedTo(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    let targetIndex = index;
    let sourceIndex = Number(event.dataTransfer.getData("song"));
    setDraggedTo(false);

    // UPDATE THE LIST
    store.addMoveSongTransaction(sourceIndex, targetIndex);
  }

  const handleClick = (event) => {
    event.stopPropagation();
    store.setCurrentIdx(index);
  };

  const handleDeleteSong = (event) => {
    event.stopPropagation();
    event.preventDefault();
    store.showRemoveSongModal(index, song);
  };

  const handleDoubleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    store.showEditSongModal(index, song);
  };

  let deleteBtn = null;

  if (store.currentList && !store.currentList.isPublished.status) {
    deleteBtn = (
      <IconButton onClick={handleDeleteSong} edge="end" aria-label="delete">
        <HighlightOffIcon fontSize="large" sx={{ color: "#c9a73a" }} />
      </IconButton>
    );
  }

  let color = "#c9a73a";
  if (store.currentSongIndex === index) {
    color = "white";
  }
  return (
    <ListItem
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      secondaryAction={deleteBtn}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable="true"
      sx={{
        padding: "1rem",
        marginBottom: "2px",
        backgroundColor: "#051622",
        cursor: "pointer",
        borderRadius: "3px",
      }}
    >
      <ListItemText sx={{ color: color }} primary={primaryText} />
    </ListItem>
  );
}

export default SongCard;
