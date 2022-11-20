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
    duplicate.count += 1;
    newPlaylist.name = `${newPlaylist.name} (${duplicate.count})`;
  }

  newPlaylist.userId = req.userId;
  newPlaylist.ownerEmail = user.email;

  const savedPlaylist = await newPlaylist.save();

  user.playlists = [
    ...userOwnedPlaylists,
    { _id: savedPlaylist._id, name: savedPlaylist.name, count: 0 },
  ];

  await user.save();

  return res.status(201).json({ success: true, playlist: savedPlaylist });
};

deletePlaylist = async (req, res) => {
  // we already know the playlists exists and belongs to the user just delete it
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
    return res.status(201).json({ success: true, playlist: deletedPlaylist });
  } catch (error) {
    return res.status(400).json({ success: false, errorMessage: err });
  }
};

getPlaylistById = async (req, res) => {
  return res.status(200).json({ success: true, playlist: res.playlist });
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
  const playlists = Playlist.find({});
};
updatePlaylist = async (req, res) => {
  const body = req.body;
  console.log("updatePlaylist: " + JSON.stringify(body));
  console.log("req.body.name: " + req.body.name);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
    console.log("playlist found: " + JSON.stringify(playlist));
    if (err) {
      return res.status(404).json({
        err,
        message: "Playlist not found!",
      });
    }

    // DOES THIS LIST BELONG TO THIS USER?
    async function asyncFindUser(list) {
      await User.findOne({ email: list.ownerEmail }, (err, user) => {
        console.log("user._id: " + user._id);
        console.log("req.userId: " + req.userId);
        if (user._id == req.userId) {
          console.log("correct user!");
          console.log("req.body.name: " + req.body.name);

          list.name = body.playlist.name;
          list.songs = body.playlist.songs;
          list
            .save()
            .then(() => {
              console.log("SUCCESS!!!");
              return res.status(200).json({
                success: true,
                id: list._id,
                message: "Playlist updated!",
              });
            })
            .catch((error) => {
              console.log("FAILURE: " + JSON.stringify(error));
              return res.status(404).json({
                error,
                message: "Playlist not updated!",
              });
            });
        } else {
          console.log("incorrect user!");
          return res
            .status(400)
            .json({ success: false, description: "authentication error" });
        }
      });
    }
    asyncFindUser(playlist);
  });
};

module.exports = {
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getPlaylistPairs,
  getPlaylists,
  updatePlaylist,
};
