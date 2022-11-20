/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require("express");
const PlaylistController = require("../controllers/playlist-controller");
const router = express.Router();
const auth = require("../auth");
const PlaylistMiddleware = require("../middleware/playlistMiddleware");

//All routes are protected
router.use(auth.verify);

// Any action with playlist id (delete,update,get) for unpublished playlist should be verified
router.use(
  "/:id",
  PlaylistMiddleware.attachPlaylist,
  PlaylistMiddleware.verifyPlaylistOwner
);

router.post("/", PlaylistController.createPlaylist);
router.delete("/:id", PlaylistController.deletePlaylist);
router.get("/:id", PlaylistController.getPlaylistById);
router.get("/playlistpairs", PlaylistController.getPlaylistPairs);
router.get("/", PlaylistController.getPlaylists);
router.put(
  "/:id",
  auth.verify,
  PlaylistMiddleware.attachPlaylist,
  PlaylistMiddleware.verifyUnpublished,
  PlaylistController.updatePlaylist
);

module.exports = router;
