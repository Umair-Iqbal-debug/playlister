/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "https://playlister-api.onrender.com",
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createPlaylist = (newListName, newSongs, userEmail) => {
  return api.post("/playlists/", {
    // SPECIFY THE PAYLOAD
    name: newListName,
    songs: newSongs,
    ownerEmail: userEmail,
  });
};
export const getPublishedPlaylistsById = (id) =>
  api.get(`/publishedPlaylists/${id}`);
export const deletePlaylistById = (id) => api.delete(`/playlists/${id}`);
export const getPlaylistById = (id) => api.get(`/playlists/${id}`);
export const searchOwnedPlaylists = (name, sortMode) => {
  const opts = { name: name };
  if (sortMode) opts.sortParam = sortMode;

  return api.get("/playlists", { params: opts });
};

export const searchPublishedPlaylists = (name, username, sortMode) => {
  const opts = {};
  if (name && name.length > 0) opts.name = name;
  if (username && username.length > 0) opts.username = username;
  if (sortMode) opts.searchParam = sortMode;

  return api.get("/publishedPlaylists", { params: opts });
};
export const getPlaylistPairs = () => api.get(`/playlists`);
export const updatePlaylistById = (id, playlist) => {
  return api.put(`/playlists/${id}`, {
    name: playlist.name,
    songs: playlist.songs,
    isPublished: playlist.isPublished.status,
  });
};

export const getAllPublishedPlaylists = () => {
  return api.get("/publishedPlaylists");
};

export const postComment = (id, text) => {
  return api.post(`publishedPlaylists/comments/${id}`, {
    text: text,
  });
};

export const postLikeStatus = (id, likeStatus) => {
  return api.post(`publishedPlaylists/like/${id}`, {
    likeStatus: likeStatus,
  });
};

export const fetchCommentById = (id) => {
  return api.get(`publishedPlaylists/comments/${id}`);
};
const apis = {
  createPlaylist,
  deletePlaylistById,
  getPlaylistById,
  getPlaylistPairs,
  updatePlaylistById,
  searchOwnedPlaylists,
  searchPublishedPlaylists,
  getAllPublishedPlaylists,
  getPublishedPlaylistsById,
  postComment,
  postLikeStatus,
  fetchCommentById,
};

export default apis;
