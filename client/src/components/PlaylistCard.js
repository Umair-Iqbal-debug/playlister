import React, { useContext, useState, useRef, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import GlobalStoreContext from "../store";
import Add from "@mui/icons-material/Add";
import WorkspaceScreen from "./WorkspaceScreen";
import EditIcon from "@mui/icons-material/Edit";
import Toolbar from "./Toolbar";
import AuthContext from "../auth";

export default function PlaylistCard({ playlist }) {
  const { store } = useContext(GlobalStoreContext);

  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2c2f70",
      },
    },
  });

  useEffect(() => {
    // was this list open ?
    if (editActive) {
      // was edit successfull ? did user click on a different list
      if (
        !store.listNameActive ||
        (store.currentList &&
          JSON.stringify(store.currentList._id) !==
            JSON.stringify(playlist._id))
      ) {
        setEditActive(false);
      }
    }
  }, [store.listNameActive]);

  const { name, _id } = playlist;

  function toggleEdit(event) {
    if (event) event.stopPropagation();
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      if (!text) {
        toggleEdit();
        return;
      }
      store.changeListName(_id, text.trim());
      //toggleEdit();
    }
  }
  function handleUpdateText(event) {
    setText(event.target.value);
  }

  const handleAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    store.addNewSong();
  };

  const handLoadList = (e) => {
    if (store.currentList && store.currentList._id == _id) {
      store.closeCurrentList();
    } else {
      store.setCurrentList(_id);
    }
  };

  let expanded = false;
  let color = "#fffff1";
  if (store && store.currentList && store.currentList._id == _id) {
    expanded = true;
    color = "#d4af37";
  }

  let card = (
    <div
      id={`detail-${playlist._id}`}
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {name}
      </Typography>

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          flexDirection: "row-reverse",
        }}
      ></div>
      <div style={{ width: "100%", height: "20px" }}>
        <Typography>
          By:{" "}
          <span style={{ textDecoration: "underline", color: "blue" }}>
            {playlist.user.username}
          </span>
        </Typography>
        <Button
          sx={{ position: "absolute", top: "50%", right: 0 }}
          variant="text"
          onClick={toggleEdit}
        >
          <EditIcon />
        </Button>
      </div>
    </div>
  );

  if (editActive) {
    card = (
      <TextField
        id={`detail-${playlist._id}`}
        margin="normal"
        required
        fullWidth
        // id={"list-" + _id}
        label="Playlist Name"
        name="name"
        autoComplete="Playlist Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={name}
        inputProps={{ style: { fontSize: 48 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <div
      id={`detail-${playlist._id}`}
      style={{ marginBottom: "0.5rem" }}
      onClick={handLoadList}
    >
      <Accordion
        expanded={expanded}
        sx={{
          backgroundColor: color,
          minHeight: "8rem",
        }}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          {card}
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <WorkspaceScreen playlist={playlist} />
            <ThemeProvider theme={theme}>
              <Button onClick={handleAdd} variant="contained">
                <Add fontSize="large" />
              </Button>
              <Toolbar />
            </ThemeProvider>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
