import React, { useContext, useEffect, useState } from "react";
import { IconButton, TextField, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { SearchMode } from "../store";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// for sorting menu
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

import AuthContext from "../auth";
import GlobalStoreContext from "../store";
function SearchBar(props) {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const searchMode = store.searchMode;
  const setSearchMode = store.setSearchMode;

  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      store.search(searchText);
    }
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortByName = () => {
    // call some store method
    store.sortByName();
    handleClose();
  };

  const handleSortByLikes = () => {
    store.sortByLikes();
    handleClose();
  };

  const handleSortByDislikes = () => {
    store.sortByDislikes();
    handleClose();
  };

  const handleSortByListens = () => {
    store.sortByListens();
    handleClose();
  };

  const handleSortByPublishDate = () => {
    store.sortByPublishDate();
    handleClose();
  };

  const handleSortByCreationDate = () => {
    store.sortByCreationDate();
    handleClose();
  };

  const handleSortByLastEditDate = () => {
    store.sortByLastEditDate();
    handleClose();
  };

  useEffect(() => {
    if (auth.loggedIn) setSearchMode("HOME");
    else setSearchMode("ALL_LISTS");
  }, [auth.loggedIn]);

  let menu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleSortByCreationDate}>
        Creation Date(Old-New)
      </MenuItem>
      <MenuItem onClick={handleSortByCreationDate}>
        By Last Edit Date(New-Old)
      </MenuItem>
      <MenuItem onClick={handleSortByName}>Name(A-Z)</MenuItem>
    </Menu>
  );

  if (store.searchMode !== "HOME") {
    menu = (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleSortByName}>Name(A-Z)</MenuItem>
        <MenuItem onClick={handleSortByPublishDate}>
          Publish Date (Newest)
        </MenuItem>
        <MenuItem onClick={handleSortByListens}>Listens (High-Low)</MenuItem>
        <MenuItem onClick={handleSortByLikes}>Likes (High-Low)</MenuItem>
        <MenuItem onClick={handleSortByDislikes}>Dislikes (High-Low)</MenuItem>
      </Menu>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SortOutlinedIcon fontSize="large" />
      </IconButton>

      {menu}
    </div>
  );
}

export default SearchBar;
