import React, { useState, useContext, useEffect } from "react";
import CommentCard from "./CommentCard";
import { Box, TextField } from "@mui/material";
import GlobalStoreContext from "../store";
import AuthContext from "../auth";

function CommentScreen() {
  const [text, setText] = useState("");
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (store.currentList) store.fetchComments();
  }, [store.currentList]);

  const onChange = (event) => {
    setText(event.target.value);
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      if (store.currentList) store.postComment(store.currentList._id, text);
      setText("");
    }
  };

  const style = {
    height: "100%",
    width: "100%",
    overflow: "scroll",
    gap: "1rem",
    minHeight: "575px",
    position: "relative",
  };

  return (
    <Box sx={style}>
      <Box
        component="div"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflow: "auto",
          backgroundColor: "white",
          padding: "1rem",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "5em",
        }}
      >
        {store.comments.map((comment) => (
          <CommentCard
            comment={{ text: comment.text, username: comment.username }}
          />
        ))}
      </Box>
      <TextField
        onKeyDown={keyDownHandler}
        value={text}
        disabled={
          !auth.loggedIn ||
          !store.currentList ||
          !store.currentList.isPublished.status
        }
        onChange={onChange}
        id="outlined-basic"
        label="Add Comment"
        variant="outlined"
        sx={{
          [`& fieldset`]: {
            borderRadius: "20px",
          },
          position: "absolute",
          bottom: "0.5em",
          left: "1em",
          right: "1em",
        }}
      />
    </Box>
  );
}

export default CommentScreen;
