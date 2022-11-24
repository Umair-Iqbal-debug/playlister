import { useContext, useEffect } from "react";
import SongCard from "./SongCard.js";
import MUIEditSongModal from "./MUIEditSongModal";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import Box from "@mui/material/Box";
import { List, Button } from "@mui/material";
import { GlobalStoreContext } from "../store/index.js";

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen({ playlist }) {
  const { store } = useContext(GlobalStoreContext);

  let modalJSX = "";
  if (store.isEditSongModalOpen()) {
    modalJSX = <MUIEditSongModal />;
  } else if (store.isRemoveSongModalOpen()) {
    modalJSX = <MUIRemoveSongModal />;
  }

  return (
    <Box>
      <List sx={{ overflow: "scroll", height: "400px" }}>
        {store.currentList &&
          store.currentList._id === playlist._id &&
          store.currentList.songs.map((song, idx) => {
            return <SongCard song={song} index={idx} />;
          })}
      </List>

      {modalJSX}
    </Box>
  );
}

export default WorkspaceScreen;
