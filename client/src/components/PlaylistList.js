import React from "react";
import PlaylistCard from "./PlaylistCard";
import GlobalStoreContext from "../store";
import { useContext, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PublishedPlaylistCard from "./PublishedPlaylistCard";
import { SearchMode } from "../store";

function PlaylistList(props) {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    store.search();
  }, [store.searchMode, store.sortMode]);

  useEffect(() => {
    if (store.currentList) {
      const id = `detail-${store.currentList._id}`;
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }
  }, [store.currentList]);

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
