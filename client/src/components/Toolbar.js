import React, { useContext } from "react";
import { UndoRounded, RedoRounded } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PublishIcon from "@mui/icons-material/Publish";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, ButtonGroup, IconButton } from "@mui/material";
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
      <IconButton onClick={handleUndo}>
        <UndoRounded sx={{ color: color }} fontSize="large" />
      </IconButton>

      <IconButton onClick={handleRedo}>
        <RedoRounded fontSize="large" />
      </IconButton>
    </ButtonGroup>
  );
  const publishBtn = (
    <IconButton onClick={handlePublish}>
      <PublishIcon fontSize="large" />
    </IconButton>
  );

  const deleteBtn = (
    <IconButton onClick={handleDeleteList}>
      <DeleteIcon fontSize="large" />
    </IconButton>
  );

  const isOwner =
    store.currentList &&
    auth.user &&
    auth.user.email == store.currentList.user.email;

  console.log(isOwner);

  const duplicateBtn = (
    <IconButton onClick={handleDuplicate}>
      <ContentCopyIcon fontSize="large" />
    </IconButton>
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
