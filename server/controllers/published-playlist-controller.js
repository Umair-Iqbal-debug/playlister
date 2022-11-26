const Playlist = require("../models/playlist-model");
const User = require("../models/user-model");

//router.get("/", PlaylistController.getPublishedPlaylists);
// router.post("/comments/:id", PlaylistController.postComment);
// router.post("/like/:id", PlaylistController.postLike);
// router.post("/dislike/:id", PlaylistController.postDislike);

getPublishedPlaylists = async (req, res) => {
  const queryObj = { "isPublished.status": true };
  if (req.query.name) queryObj.name = { $regex: req.query.name, $options: "i" };
  if (req.query.firstName)
    queryObj["user.firstName"] = { $regex: req.query.firstName, $options: "i" };
  if (req.query.lastName)
    queryObj["user.lastName"] = { $regex: req.query.lastName, $options: "i" };
  if (req.query.username)
    queryObj["user.username"] = { $regex: req.query.username, $options: "i" };

  // need to add firstName and lastName into fields
  const fields =
    "isPublished likeCount dislikeCount listens _id name user likes";
  const publishedPlaylists = await Playlist.find(queryObj, fields);

  return res.status(200).json({ success: true, playlists: publishedPlaylists });
};

postComment = async (req, res) => {
  if (!req.body.text)
    return res.status(400).json({
      success: false,
      errorMessage: "Please make sure the body has text property",
    });

  req.playlist.comments = [
    ...req.playlist.comments,
    { text: req.body.text, username: req.username },
  ];

  const updatedPlaylist = await req.playlist.save();

  res.status(200).json({ success: true, playlist: updatedPlaylist });
};

// /like: Boolean,
// dislike: Boolean,
// userId: { type: ObjectId, ref: "User" },

postLikeStatus = async (req, res) => {
  //request body format = {likeStatus:-1,0,1,playlistId}

  const playlist = req.playlist;

  const likeStatusObj = playlist.likes.find(
    (likeObj) => JSON.stringify(likeObj.userId) == JSON.stringify(req.userId)
  );

  let newLikeStatus = req.body.likeStatus;
  // has an exisisting record
  if (likeStatusObj) {
    const oldLikeStatus = likeStatusObj.likeStatus;
    if (oldLikeStatus !== newLikeStatus) {
      likeStatusObj.likeStatus = newLikeStatus;

      // disliked earlier
      if (oldLikeStatus === -1) {
        req.playlist.dislikeCount -= 1;
        if (newLikeStatus === 1) playlist.likeCount += 1;
      } else if (oldLikeStatus === 1) {
        req.playlist.likeCount -= 1;
        if (newLikeStatus === -1) playlist.dislikeCount += 1;
      } else if (oldLikeStatus === 0) {
        if (newLikeStatus === -1) playlist.dislikeCount += 1;
        if (newLikeStatus === 1) playlist.likeCount += 1;
      }
    }
  } else {
    if (newLikeStatus === -1) playlist.dislikeCount += 1;
    if (newLikeStatus === 1) playlist.likeCount += 1;
    playlist.likes.push({
      likeStatus: newLikeStatus,
      userId: req.userId,
    });
  }

  //update playlist in db
  const updatedPlaylist = await req.playlist.save();

  //send response
  res.status(200).json({ sucess: true, playlist: updatedPlaylist });
};

getPublishedPlaylistById = (req, res) => {
  return res.status(200).json({ sucess: true, playlist: req.playlist });
};

module.exports = {
  getPublishedPlaylists,
  postComment,
  postLikeStatus,
  getPublishedPlaylistById,
};
