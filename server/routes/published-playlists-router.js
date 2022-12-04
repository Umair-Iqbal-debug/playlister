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

router.get("/", PlaylistController.getPublishedPlaylists);
router.get(
  "/:id",
  PlaylisterMiddleware.attachPlaylist,
  PlaylisterMiddleware.verifyPublished,
  PlaylistController.getPublishedPlaylistById
);
router.post(
  "/comments/:id",
  auth.verify,
  PlaylisterMiddleware.attachPlaylist,
  PlaylisterMiddleware.verifyPublished,
  PlaylistController.postComment
);
router.get(
  "/comments/:id",
  PlaylisterMiddleware.attachPlaylist,
  PlaylistController.getComments
);
router.post(
  "/like/:id",
  auth.verify,
  PlaylisterMiddleware.attachPlaylist,
  PlaylisterMiddleware.verifyPublished,
  PlaylistController.postLikeStatus
);

module.exports = router;
