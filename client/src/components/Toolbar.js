import React, { useContext } from "react";
import { UndoRounded, RedoRounded } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PublishIcon from "@mui/icons-material/Publish";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, ButtonGroup, Button } from "@mui/material";
import GlobalStoreContext from "../store";
import AuthContext from "../auth";

function Toolbar() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  const handleDeleteList = (event) => {
    event.stopPropagation();
    store.markListForDeletion(store.currentList._id);
  };

  const handleUndo = (event) => {
    event.stopPropagation();
    store.undo();
  };

  const handleRedo = (event) => {
    event.stopPropagation();
    store.redo();
  };

  const handlePublish = (event) => {
    event.stopPropagation();
    store.publishCurrentList();
  };

  const handleDuplicate = (event) => {
    event.stopPropagation();
    store.duplicateCurrentList();
  };

  const isPublished = store.currentList && store.currentList.isPublished.status;
  const color = "c9a73a";

  const undoRedo = (
    <ButtonGroup>
      <Button
        disabled={!store.canUndo()}
        variant="contained"
        onClick={handleUndo}
      >
        <UndoRounded fontSize="large" />
      </Button>

      <Button
        disabled={!store.canRedo()}
        variant="contained"
        onClick={handleRedo}
      >
        <RedoRounded fontSize="large" />
      </Button>
    </ButtonGroup>
  );
  const publishBtn = (
    <Button variant="contained" onClick={handlePublish}>
      <PublishIcon fontSize="large" />
    </Button>
  );

  const deleteBtn = (
    <Button variant="contained" onClick={handleDeleteList}>
      <DeleteIcon fontSize="large" />
    </Button>
  );

  const isOwner =
    store.currentList &&
    auth.user &&
    auth.user.email == store.currentList.user.email;

  const duplicateBtn = (
    <Button onClick={handleDuplicate} variant="contained">
      <ContentCopyIcon fontSize="large" />
    </Button>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
      {!isPublished && undoRedo}

      <ButtonGroup sx={{ marginLeft: "auto" }}>
        {!isPublished && publishBtn}

        {isOwner && deleteBtn}

        {auth.loggedIn && duplicateBtn}
      </ButtonGroup>
    </Box>
  );
}

export default Toolbar;
