/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require("express");
const PlaylistController = require("../controllers/published-playlist-controller");
const router = express.Router();
const auth = require("../auth");
const PlaylisterMiddleware = require("../middleware/playlistMiddleware");

// attach playlist and verify its published
router.use(
  "/*/:id",
  auth.verify,
  PlaylisterMiddleware.attachPlaylist,
  PlaylisterMiddleware.verifyPublished
);

router.get("/", PlaylistController.getPublishedPlaylists);
router.get(
  "/:id",
  PlaylisterMiddleware.attachPlaylist,
  PlaylisterMiddleware.verifyPublished,
  PlaylistController.getPublishedPlaylistById
);
router.post("/comments/:id", PlaylistController.postComment);
router.post("/like/:id", PlaylistController.postLike);
router.post("/dislike/:id", PlaylistController.postDislike);

module.exports = router;
