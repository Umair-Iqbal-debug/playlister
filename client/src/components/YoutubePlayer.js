import { Button, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";

function YoutubePlayer(props) {
  const [player, setPlayer] = useState(null);

  const [currentList, setCurrentList] = useState([
    "ntn6q-ODULo",
    "vJMMf-z25I0",
    "e0_V8IoYSLU",
    "x1XuN5Rq2ws",
    "mqmxkGjow1A",
    "8UbNbor3OqQ",
    "THL1OPn72vo",
    "jGcgCa_WuRQ",
  ]);

  const [shuffle, setShuffle] = useState(false);

  const [currentIdx, setCurrentIdx] = useState(-1);

  const [playerState, setPlayerState] = useState(-1);

  useEffect(() => {
    if (window.YT) return;
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return () => {
      window.YT = null;
      window.onYouTubeIframeAPIReady = null;
      tag.remove();
      const elem = document.getElementById("www-widgetapi-script");
      if (elem) elem.remove();
    };
  }, []);

  useEffect(() => {
    if (player && player.loadVideoById && currentList) {
      player.loadVideoById(currentList[currentIdx]);
    }
  }, [currentIdx, player, currentList]);

  useEffect(() => {
    if (playerState === 0) {
      handleSongEnd();
    }
  }, [playerState]);

  function onYouTubeIframeAPIReady() {
    if (!window.YT) return;
    window.player = new window.YT.Player("player", {
      height: "390",
      width: "500",
      controls: "0",
      videoId: currentIdx > -1 && currentList ? currentList[currentIdx] : "",
      playerVars: {
        playsinline: 1,
        origin: window.location,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });

    setPlayer(window.player);
  }

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    setPlayerState(event.data);
  };

  const toggleShuffle = () => {
    setShuffle((prev) => !prev);
  };

  const handleSongEnd = () => {
    console.log(shuffle);
    if (shuffle) getRandom();
    else handleNext();
  };

  const getRandom = () => {
    setCurrentIdx((prev) => Math.floor(Math.random() * currentList.length));
  };
  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % currentList.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => {
      let newCount = prev - 1;
      if (newCount < 0) return newCount + currentList.length;
      return newCount;
    });
  };
  const handleClick = () => {
    setCurrentIdx(0);
  };

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#d4d4f5",
    borderRadius: "4px",
    gap: "1rem",
  };

  return (
    <Box style={style}>
      <div id="player"></div>
      <Typography variant="h5">Now Playing</Typography>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="subtitle2">
          Playlist: Songs To make you cry
        </Typography>
        <Typography variant="subtitle2">Song#: {currentIdx + 1}</Typography>
        <Typography variant="subtitle2">
          Title: Last Day of Our Acquaintance
        </Typography>
        <Typography variant="subtitle2">Artist: Sinead O'Connor</Typography>
        <PlayerControls
          player={player}
          handleNext={handleNext}
          handlePrev={handlePrev}
          toggleShuffle={toggleShuffle}
          shuffle={shuffle}
        />
      </Box>
      <Button onClick={handleClick}>Select playlist</Button>

      {currentList.map((_, idx) => {
        return (
          <Button variant="outlined" onClick={() => setCurrentIdx(idx)}>
            {idx + 1}
          </Button>
        );
      })}
    </Box>
  );
}

export default YoutubePlayer;
