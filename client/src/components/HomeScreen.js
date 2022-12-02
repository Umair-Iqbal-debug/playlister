import React, { useContext } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BasicTabs from "./BasicTabs";
import SearchBar from "./SearchBar";
import PlaylistList from "./PlaylistList";
import AddIcon from "@mui/icons-material/Add";
import GlobalStoreContext, { SearchMode } from "../store";
import MUIDeleteModal from "./MUIDeleteModal";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import ErrorModalHomeScreen from "./ErrorModalHomeScreen";
import MUIEditSongModal from "./MUIEditSongModal";

function HomeScreen(props) {
  const { store } = useContext(GlobalStoreContext);
  const handleCreateList = () => {
    store.createNewList();
  };

  let modalJSX = "";
  if (store.isEditSongModalOpen()) {
    modalJSX = <MUIEditSongModal />;
  } else if (store.isRemoveSongModalOpen()) {
    modalJSX = <MUIRemoveSongModal />;
  } else if (store.isDeleteListModalOpen()) {
    modalJSX = <MUIDeleteModal />;
  }

  const addButton = (
    <IconButton onClick={handleCreateList}>
      <AddIcon fontSize="large" />
    </IconButton>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        marginTop: "62px",
        backgroundColor: "#c4c4c4",
        // border: "2px solid red",
      }}
    >
      <div className="container">
        <div className="nav-bar common">
          <SearchBar />
        </div>

        <div className="main-content">
          <PlaylistList />
          <BasicTabs />
        </div>

        <div
          className="status-bar common"
          style={{ textAlign: "center", padding: "0.5em" }}
        >
          {store.searchMode === SearchMode.HOME ? addButton : ""}

          <Typography sx={{ display: "inline" }} variant="h4">
            {store.searchText || ""} Lists
          </Typography>
          {modalJSX}
          <ErrorModalHomeScreen />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
