import React, { useState } from "react";
import CommentCard from "./CommentCard";
import { Box, TextField } from "@mui/material";

function CommentScreen() {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([
    {
      username: "GilmourAndMore",
      text: "Dogs is the Best Pink Floyd song and you are an idiot if you think otherwise",
    },
    {
      username: "GilmourAndMore",
      text: "Dogs is the Best Pink Floyd song and you are an idiot if you think otherwise",
    },
  ]);

  const addComment = (text) => {
    setComments((prev) => [...prev, { username: "UmairIqbal", text: text }]);
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      addComment(event.target.value);
      setText("");
    }
  };

  const style = {
    height: "100%",
    width: "100%",
    overflow: "scroll",
    gap: "1rem",
    minHeight: "575px",
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
          backgroundColor: "#d4d4f6",
          padding: "1rem",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "1.5em",
        }}
      >
        {comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
      </Box>
      <TextField
        onKeyDown={keyDownHandler}
        value={text}
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
