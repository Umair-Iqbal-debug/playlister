/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require("express");
const router = express.Router();
const playlistsRouter = require("./playlists-router");
const publishedPlaylistsRouter = require("./published-playlists-router");

router.use("/playlists", playlistsRouter);
router.use("/publishedPlaylists", publishedPlaylistsRouter);

module.exports = router;
