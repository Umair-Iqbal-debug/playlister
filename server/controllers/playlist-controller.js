const Playlist = require("../models/playlist-model");
const User = require("../models/user-model");

createPlaylist = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Playlist",
    });
  }

  const newPlaylist = new Playlist(body);

  if (!newPlaylist) {
    return res.status(400).json({ success: false, errorMessage: "" });
  }

  // grab the user
  const user = await User.findById(req.userId);

  if (!user) return res.status(404).json({ success: false, errorMessage: "" });

  // make sure user doesn't have a playlist with the same name
  const userOwnedPlaylists = user.playlists;

  const duplicate = userOwnedPlaylists.find(
    (playlist) => playlist.name === newPlaylist.name
  );

  // if they do increase the counter of the original by one and create new list with name + counter
  if (duplicate) {
    user.count += 1;
    newPlaylist.name = `${newPlaylist.name} (${user.count})`;
  }

  newPlaylist.user = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userId: user._id,
    username: user.username,
  };

  const savedPlaylist = await newPlaylist.save();

  // keep global counter instead of what you have

  user.playlists = [
    ...userOwnedPlaylists,
    { _id: savedPlaylist._id, name: savedPlaylist.name },
  ];

  await user.save();

  return res.status(201).json({ success: true, playlist: savedPlaylist });
};

deletePlaylist = async (req, res) => {
  // we already know the playlists exists and belongs to the user just delete it
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.userId);

    user.playlists = user.playlists.filter(
      (playlist) => playlist._id != req.params.id
    );
    await user.save();

    return res.status(201).json({ success: true, playlist: deletedPlaylist });
  } catch (error) {
    return res.status(400).json({ success: false, errorMessage: err });
  }
};

getPlaylistById = async (req, res) => {
  return res.status(200).json({ success: true, playlist: req.playlist });
};

getPlaylistPairs = async (req, res) => {
  await User.findOne({ _id: req.userId }, (err, user) => {
    console.log("find user with id " + req.userId);
    async function asyncFindList(email) {
      console.log("find all Playlists owned by " + email);
      await Playlist.find({ ownerEmail: email }, (err, playlists) => {
        console.log("found Playlists: " + JSON.stringify(playlists));
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!playlists) {
          console.log("!playlists.length");
          return res
            .status(404)
            .json({ success: false, error: "Playlists not found" });
        } else {
          console.log("Send the Playlist pairs");
          // PUT ALL THE LISTS INTO ID, NAME PAIRS
          let pairs = [];
          for (let key in playlists) {
            let list = playlists[key];
            let pair = {
              _id: list._id,
              name: list.name,
            };
            pairs.push(pair);
          }
          return res.status(200).json({ success: true, idNamePairs: pairs });
        }
      }).catch((err) => console.log(err));
    }
    asyncFindList(user.email);
  }).catch((err) => console.log(err));
};

getPlaylists = async (req, res) => {
  const queryObj = { "user.userId": req.userId };
  if (req.query.name) queryObj.name = { $regex: req.query.name, $options: "i" };

  const playlists = await Playlist.find(queryObj);
  return res.status(200).json({ success: true, playlists: playlists });
};

updatePlaylist = async (req, res) => {
  const body = req.body;
  console.log("updatePlaylist: " + JSON.stringify(body));
  console.log("req.body.name: " + req.body.name);

  if (!body || body.name === undefined || body.songs === undefined) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  const { name, songs } = body;

  req.playlist.name = name;
  req.playlist.songs = songs;

  console.log(body);

  if (req.body.isPublished) {
    req.playlist.isPublished = { status: true, date: Date.now() };
  }

  try {
    const updatedPlaylist = await req.playlist.save();
    res.status(200).json({ success: true, playlist: updatedPlaylist });
  } catch (err) {
    return res.status(500).json({ success: false, errorMessage: err });
  }
};

module.exports = {
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getPlaylistPairs,
  getPlaylists,
  updatePlaylist,
};
