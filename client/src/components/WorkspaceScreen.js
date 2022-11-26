import { useContext } from "react";
import SongCard from "./SongCard.js";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import { GlobalStoreContext } from "../store/index.js";

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen({ playlist }) {
  const { store } = useContext(GlobalStoreContext);

  return (
    <Box sx={{ overflow: "scroll", maxHeight: "400px" }}>
      <List sx={{ overflow: "scroll", height: "300px", marginBottom: "1em" }}>
        {store.currentList &&
          store.currentList._id === playlist._id &&
          store.currentList.songs.map((song, idx) => {
            return (
              <SongCard
                id={"playlist-song-" + idx}
                key={"playlist-song-" + idx}
                song={song}
                index={idx}
              />
            );
          })}
      </List>
    </Box>
  );
}

export default WorkspaceScreen;
