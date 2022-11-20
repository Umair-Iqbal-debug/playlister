const Playlist = require("../models/playlist-model");
const User = require("../models/user-model");

//router.get("/", PlaylistController.getPublishedPlaylists);
// router.post("/comments/:id", PlaylistController.postComment);
// router.post("/like/:id", PlaylistController.postLike);
// router.post("/dislike/:id", PlaylistController.postDislike);

getPublishedPlaylists = async (req, res) => {
  const queryObj = { "isPublished.status": true };
  if (req.query.name) queryObj.name = { $regex: req.query.name, $options: "i" };
  const fields = "isPublished likeCount dislikeCount listens _id name";
  const publishedPlaylists = await Playlist.find(queryObj, fields);

  return res.status(200).json({ success: true, playlist: publishedPlaylists });
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

postLike = async (req, res) => {
  // has the person liked or disliked before ?
  const likeStatus = req.playlist.likes.find(
    (likeObj) => likeObj.userId == req.userId
  );

  // has already liked then don't do anything
  if (likeStatus) {
    if (likeStatus.like)
      return res.status(200).json({ success: true, playlist: req.playlist });
    likeStatus.like = true;
    likeStatus.dislike = false;
    // has disliked then subtract total dislikes
    req.playlist.dislikeCount -= 1;
  } else {
    req.playlist.likes = [
      ...req.playlist.likes,
      { like: true, dislike: false, userId: req.userId },
    ];
  }

  // increment likeCount
  req.playlist.likeCount += 1;

  //update playlist in db
  const updatedPlaylist = await req.playlist.save();

  //send response
  res.status(200).json({ sucess: true, playlist: updatedPlaylist });
};

postDislike = async (req, res) => {
  // has the person liked or disliked before ?
  const likeStatus = req.playlist.likes.find(
    (likeObj) => likeObj.userId == req.userId
  );

  // has already liked then don't do anything
  if (likeStatus) {
    if (likeStatus.dislike)
      return res.status(200).json({ success: true, playlist: req.playlist });
    likeStatus.dislike = true;
    likeStatus.like = false;
    // has disliked then subtract total dislikes
    req.playlist.likeCount -= 1;
  } else {
    req.playlist.likes = [
      ...req.playlist.likes,
      { like: false, dislike: true, userId: req.userId },
    ];
  }

  // increment likeCount
  req.playlist.dislikeCount += 1;

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
  postLike,
  postDislike,
  getPublishedPlaylistById,
};
