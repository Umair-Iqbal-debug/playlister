import React, { useContext } from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GlobalStoreContext from "../store";

function SongCard({ song, index }) {
  const primaryText = `${index + 1}. ${song.title} `;
  const { store } = useContext(GlobalStoreContext);
  const handleClick = (event) => {
    event.stopPropagation();

    if (event.detail === 2) {
      console.log("clicked");
      store.showEditSongModal(index, song);
    } else if (event.detail === 1) {
      store.setCurrentIdx(index);
    }
  };

  const handleDeleteSong = (event) => {
    event.stopPropagation();
    store.showRemoveSongModal(index, song);
  };

  let deleteBtn = null;

  if (store.currentList && !store.currentList.isPublished.status) {
    deleteBtn = (
      <IconButton onClick={handleDeleteSong} edge="end" aria-label="delete">
        <DeleteIcon sx={{ color: "#c9a73a" }} />
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
      secondaryAction={deleteBtn}
      sx={{
        padding: "1rem",
        marginBottom: "0",
        backgroundColor: "#2c2f70",
        cursor: "pointer",
      }}
    >
      <ListItemText sx={{ color: color }} primary={primaryText} />
    </ListItem>
  );
}

export default SongCard;
