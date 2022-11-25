import React, { useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton } from "@mui/material";
import GlobalStoreContext from "../store";
import Add from "@mui/icons-material/Add";
import WorkspaceScreen from "./WorkspaceScreen";

import Toolbar from "./Toolbar";

export default function PlaylistCard({ playlist }) {
  const { store } = useContext(GlobalStoreContext);

  const { name, _id } = playlist;

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

  return (
    <div style={{ marginBottom: "0.5rem" }} onClick={handLoadList}>
      <Accordion
        expanded={expanded}
        sx={{
          backgroundColor: color,
          minHeight: "8rem",
        }}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <div
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
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <WorkspaceScreen playlist={playlist} />
            <Button
              onClick={handleAdd}
              variant="filled"
              sx={{ backgroundColor: "#2c2f70" }}
            >
              <Add fontSize="large" />
            </Button>
            <Toolbar />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
