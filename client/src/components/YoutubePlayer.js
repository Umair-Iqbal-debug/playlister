import { Button, Typography, Box, Card } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";
import CircularProgress from "@mui/material/CircularProgress";
import GlobalStoreContext from "../store";
import { CurrentModal } from "../store";

function YoutubePlayer(props) {
  const { store } = useContext(GlobalStoreContext);

  useEffect(() => {
    if (store.currentList && store.currentList.songs) {
      setCurrentList(store.currentList.songs);
      // setCurrentIdx(0);
    } else {
      if (player && player.loadVideoById) player.loadVideoById("");
    }
  }, [store.currentList]);

  const [player, setPlayer] = useState(null);

  const [currentList, setCurrentList] = useState([]);

  const [shuffle, setShuffle] = useState(false);

  const [currentIdx, setCurrentIdx] = useState(-1);

  const [playerState, setPlayerState] = useState(-1);

  useEffect(() => {
    if (store && store.currentSongIndex !== undefined) {
      setCurrentIdx(store.currentSongIndex);
    }
  }, [store.currentSongIndex]);

  useEffect(() => {
    if (window.YT) {
      return;
    }
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
    if (
      player &&
      player.loadVideoById &&
      currentList &&
      currentIdx > -1 &&
      currentList[currentIdx]
    ) {
      player.loadVideoById(currentList[currentIdx].youTubeId);
      window.songId = currentList[currentIdx].youTubeId;
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
      videoId:
        currentIdx > -1 && currentList ? currentList[currentIdx].youTubeId : "",
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
    // console.log("SONG ID:", window.songId);
    if (store.currentList) event.target.loadVideoById(window.songId);
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
    store.setCurrentIdx(Math.floor(Math.random() * currentList.length));
  };
  const handleNext = () => {
    store.setCurrentIdx((store.currentSongIndex + 1) % currentList.length);
  };

  const handlePrev = () => {
    let prev = store.currentSongIndex;
    let newCount = prev - 1;
    if (newCount < 0) newCount += currentList.length;
    store.setCurrentIdx(newCount);
  };
  const handleClick = () => {
    store.addNewSong();
  };

  let title = "",
    artist = "",
    playlistName = "";
  if (currentIdx > -1 && currentList.length > 0) {
    let song = currentList[currentIdx];
    if (song) {
      title = song.title;
      artist = song.artist;
      playlistName = currentList.name;
    }
  }

  return (
    <div className="playercontainer">
      <div id="player">
        <CircularProgress />
      </div>
      <h2 variant="h5" id="player-detail-header">
        Now Playing
      </h2>
      <div id="player-detail-container">
        <Typography variant="subtitle2">
          Playlist: {store.currentList && store.currentList.name}
        </Typography>
        <Typography variant="subtitle2">Song#: {currentIdx + 1}</Typography>
        <Typography variant="subtitle2">Title:{title}</Typography>
        <Typography variant="subtitle2">Artist: {artist}</Typography>
      </div>
      <PlayerControls
        player={player}
        handleNext={handleNext}
        handlePrev={handlePrev}
        toggleShuffle={toggleShuffle}
        shuffle={shuffle}
      />
    </div>
  );
}

export default YoutubePlayer;
