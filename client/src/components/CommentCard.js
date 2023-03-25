import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CommentCard = (props) => {
  const { text, username } = props.comment;
  return (
    <Card
      elevation={3}
      sx={{ minHeight: "8rem", backgroundColor: "var(--primary-bg-color)" }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, textDecoration: "underline" }}
          color="#3329bb"
          gutterBottom
        >
          {username}
        </Typography>
        <Typography variant="h6" component="div">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
