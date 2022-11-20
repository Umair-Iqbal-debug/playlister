const Playlist = require("../models/playlist-model");

attachPlaylist = async (req, res, next) => {
  //    const playlist = await dbManager.getPlaylistById(req.params.id)
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist)
    return res
      .status(404)
      .json({ success: false, errorMessage: "Playlist not found!" });

  req.playlist = playlist;
  next();
};

verifyPlaylistOwner = (req, res, next) => {
  if (req.playlist.userId != req.userId)
    return res
      .status(401)
      .json({ success: false, errorMessage: "Unauthorised" });

  next();
};

verifyPublished = (req, res, next) => {
  if (!req.playlist.isPublished.status)
    return res
      .status(400)
      .json({ success: false, errorMessage: "That playlist is unpublished!" });

  next();
};

verifyUnpublished = (req, res, next) => {
  if (req.playlist.isPublished.status)
    return res.status(400).json({
      success: false,
      errorMessage: "That playlist is published and cannot be edited!",
    });

  next();
};

attachUser = (req, res) => {};

module.exports = {
  attachPlaylist,
  verifyPlaylistOwner,
  verifyPublished,
  verifyUnpublished,
  attachUser,
};
