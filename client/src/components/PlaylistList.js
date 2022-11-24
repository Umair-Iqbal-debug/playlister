import React from "react";
import PlaylistCard from "./PlaylistCard";
import GlobalStoreContext from "../store";
import { useContext, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PublishedPlaylistCard from "./PublishedPlaylistCard";
import { SearchMode } from "../store";

function PlaylistList(props) {
  const { store } = useContext(GlobalStoreContext);

  console.log(store.idNamePairs);

  useEffect(() => {
    let mode = store.searchMode;
    if (mode === SearchMode.HOME) store.loadIdNamePairs();
    else store.getAllPublishedPlaylists();
  }, [store.searchMode]);

  useEffect(() => {
    console.log(store.idNamePairs);
  }, [store.idNamePairs]);

  return (
    <div
      className="playlists common"
      style={{
        overflow: "scroll",
        padding: "1rem",
        height: "620px",
      }}
    >
      {store.idNamePairs &&
        store.idNamePairs.map((playlist) => {
          if (playlist.isPublished.status)
            return (
              <PublishedPlaylistCard key={playlist._id} playlist={playlist} />
            );
          return <PlaylistCard key={playlist._id} playlist={playlist} />;
        })}
    </div>
  );
}

export default PlaylistList;
