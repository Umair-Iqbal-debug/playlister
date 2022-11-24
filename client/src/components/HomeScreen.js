import React, { useContext } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BasicTabs from "./BasicTabs";
import SearchBar from "./SearchBar";
import PlaylistList from "./PlaylistList";
import AddIcon from "@mui/icons-material/Add";
import GlobalStoreContext, { SearchMode } from "../store";

function HomeScreen(props) {
  const { store } = useContext(GlobalStoreContext);
  const handleCreateList = () => {
    store.createNewList();
  };

  const addButton = (
    <IconButton onClick={handleCreateList}>
      <AddIcon fontSize="large" />
    </IconButton>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "80",
        marginTop: "62px",
        backgroundColor: "#c4c4c4",
      }}
    >
      <div className="container">
        <div class="nav-bar common">
          <SearchBar />
        </div>

        <PlaylistList />

        <div className="youtube-player common">
          <BasicTabs />
        </div>
        <div
          className="status-bar common"
          style={{ textAlign: "center", padding: "0.5em" }}
        >
          {store.searchMode === SearchMode.HOME ? addButton : ""}

          <Typography variant="h4"> Lists</Typography>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
