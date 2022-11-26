import React from "react";
import { Box, Button, Card, IconButton } from "@mui/material";
import PlayArrowRoundIcon from "@mui/icons-material/PlayArrowRounded";
import FastRewindRoundIcon from "@mui/icons-material/FastRewindRounded";
import StopRoundIcon from "@mui/icons-material/Stop";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import ShuffleOnRoundedIcon from "@mui/icons-material/ShuffleOnRounded";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

function PlayerControls({
  player,
  handleNext,
  handlePrev,
  toggleShuffle,
  shuffle,
}) {
  const handlePlay = () => {
    player.playVideo();
  };

  const handlePause = () => {
    player.pauseVideo();
  };
  const style = {
    color: "black",
    fontSize: "3rem",
  };
  const containerStyle = {
    textAlign: "center",
    backgroundColor: "#fffff1",
    marginTop: "0.5em",
    borderRadius: "20px",
    borderColor: "black",
    paddingBottom: "1.1em",
    // border: "1px solid black",
  };

  let shuffleBtn = (
    <Button variant="text" onClick={toggleShuffle}>
      <ShuffleRoundedIcon style={style} />
    </Button>
  );
  if (shuffle)
    shuffleBtn = (
      <Button variant="text" onClick={toggleShuffle}>
        <ShuffleOnRoundedIcon style={style} />
      </Button>
    );

  return (
    <Card elevation={3} sx={containerStyle}>
      <IconButton onClick={handlePrev} size="large">
        <SkipPreviousIcon style={style} />
      </IconButton>
      <Button variant="text" onClick={handlePause}>
        <StopRoundIcon style={style} />
      </Button>
      <Button variant="text" onClick={handlePlay}>
        <PlayArrowRoundIcon style={style} />
      </Button>
      <Button variant="text" onClick={handleNext}>
        <SkipNextIcon style={style} />
      </Button>

      {shuffleBtn}
    </Card>
  );
}

export default PlayerControls;
