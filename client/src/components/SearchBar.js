import React, { useContext, useEffect, useState } from "react";
import { IconButton, TextField, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { SearchMode } from "../store";

// for sorting menu
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

import AuthContext from "../auth";
import GlobalStoreContext from "../store";
function SearchBar(props) {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const searchMode = store.searchMode;
  const setSearchMode = store.setSearchMode;

  // const [searchMode, setSearchMode] = useState("HOME");
  console.log(store.searchMode);

  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      if (searchText.length === 0) store.loadIdNamePairs();
      else store.search(searchText);
    }
  };

  useEffect(() => {
    if (auth.loggedIn) setSearchMode("HOME");
    else setSearchMode("ALL_LISTS");
  }, [auth.loggedIn]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {auth.loggedIn && (
        <IconButton onClick={() => setSearchMode("HOME")}>
          {store.searchMode !== "HOME" ? (
            <HomeOutlinedIcon fontSize="large" />
          ) : (
            <HomeRoundedIcon fontSize="large" />
          )}
        </IconButton>
      )}

      <IconButton onClick={() => setSearchMode("ALL_LISTS")}>
        {searchMode !== "ALL_LISTS" ? (
          <Groups2OutlinedIcon fontSize="large" />
        ) : (
          <Groups2RoundedIcon fontSize="large" />
        )}
      </IconButton>

      <IconButton onClick={() => setSearchMode("USERS")}>
        {searchMode !== "USERS" ? (
          <PersonOutlineRoundedIcon fontSize="large" />
        ) : (
          <PersonRoundedIcon fontSize="large" />
        )}
      </IconButton>

      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchTextChange}
        onKeyUp={handleKeyUp}
        sx={{
          width: "500px",
          marginLeft: "1em",
          backgroundColor: "whitesmoke",
          // marginTop: "1em",
        }}
      />

      <Typography variant="button" sx={{ marginLeft: "auto" }}>
        SORT BY
      </Typography>
      <IconButton>
        <SortOutlinedIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default SearchBar;
