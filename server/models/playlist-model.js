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
    ownerEmail: { type: String, required: true },
    userId: { type: ObjectId, ref: "User" },
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
          like: Boolean,
          dislike: Boolean,
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
      date: { type: Date, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
