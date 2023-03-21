import React, { useContext } from "react";
import { ListItem, ListItemText } from "@mui/material";
import GlobalStoreContext from "../store";

function PublishedSongCard({ song, index }) {
  const primaryText = `${index + 1}. ${song.title} `;
  const { store } = useContext(GlobalStoreContext);

  const handleClick = (event) => {
    event.stopPropagation();
    store.setCurrentIdx(index);
  };

  let color = "#c9a73a";
  if (store.currentSongIndex === index) {
    color = "white";
  }
  return (
    <ListItem
      onClick={handleClick}
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

export default PublishedSongCard;
