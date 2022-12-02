import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function SplashScreen(props) {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    gap: "5em",
    background: "linear-gradient(white,grey)",
  };

  const buttonBoxStyle = {
    display: "flex",
    displayDirection: "row",
    gap: "5em",
  };

  const buttonStyles = {
    width: "197px",
    height: "42px",
    backgroundColor: "black",
    "&:hover": { backgroundColor: "black" },
  };

  const linkStyles = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <Box sx={style}>
      <Typography variant="h1" sx={{ fontWeight: "bold" }}>
        Welcome to playlister
      </Typography>
      <Typography variant="h6" sx={{ width: "500px" }}>
        Playlister is an app you can use to create, edit and play playlists of
        YouTube Music Videos. You can also view and comment on playlists made by
        other users
      </Typography>

      <Box sx={buttonBoxStyle}>
        <Button
          sx={buttonStyles}
          variant="contained"
          component={Link}
          to="/login"
        >
          login
        </Button>
        <Button
          sx={buttonStyles}
          variant="contained"
          component={Link}
          to="/register"
        >
          Create new account
        </Button>
        <Button
          sx={buttonStyles}
          variant="contained"
          component={Link}
          to="/homescreen"
        >
          Continue As a guest
        </Button>
      </Box>

      <Typography sx={{ position: "absolute", bottom: "5px" }}>
        © Umair Hoda
      </Typography>
    </Box>
  );
}

export default SplashScreen;
