const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    playlists: [
      {
        name: String,
        _id: { type: ObjectId, ref: "Playlist" },
      },
    ],
    count: { type: Number, default: 0 },
    likes: {
      type: [
        {
          like: Boolean,
          dislike: Boolean,
          playlistId: { type: ObjectId, ref: "Playlist" },
        },
      ],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
