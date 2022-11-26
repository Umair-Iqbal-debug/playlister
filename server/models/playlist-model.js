const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    user: {
      email: { type: String, required: true },
      userId: { type: ObjectId, ref: "User" },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      username: { type: String, required: true },
    },
    songs: {
      type: [
        {
          title: String,
          artist: String,
          youTubeId: String,
        },
      ],
      required: true,
      default: [],
    },

    comments: {
      type: [
        {
          text: String,
          username: String,
        },
      ],
      required: true,
      default: [],
    },

    likes: {
      type: [
        {
          likeStatus: Number,
          userId: { type: ObjectId, ref: "User" },
        },
      ],
      required: true,
      default: [],
    },

    likeCount: { type: Number, required: true, default: 0 },

    dislikeCount: { type: Number, required: true, default: 0 },

    listens: { type: Number, required: true, default: 0 },

    isPublished: {
      status: { type: Boolean, default: false },
      date: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
