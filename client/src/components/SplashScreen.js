import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function SplashScreen(props) {
  const buttonBoxStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const buttonStyles = {
    width: "197px",
    height: "30px",
    backgroundColor: "#1BA098",
    "&:hover": { backgroundColor: "#051622" },
  };

  const linkStyles = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <div className="splash-screen-container">
      <h1 className="splash-title">Playlister</h1>
      <h6 className="splash-desc">
        Playlister is an app you can use to create, edit and play playlists of
        YouTube Music Videos. You can also view and comment on playlists made by
        other users
      </h6>

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

      <Typography
        sx={{ position: "absolute", bottom: "5px", color: "#DEB992" }}
      >
        © Umair Hoda
      </Typography>
    </div>
  );
}

export default SplashScreen;
