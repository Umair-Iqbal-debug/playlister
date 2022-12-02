import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsTPS from "../common/jsTPS";
import api from "./store-request-api";
import CreateSong_Transaction from "../transactions/CreateSong_Transaction";
import MoveSong_Transaction from "../transactions/MoveSong_Transaction";
import RemoveSong_Transaction from "../transactions/RemoveSong_Transaction";
import UpdateSong_Transaction from "../transactions/UpdateSong_Transaction";
import AuthContext from "../auth";
import { Sort } from "@mui/icons-material";
import { Global } from "@emotion/react";

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
  HIDE_MODALS: "HIDE_MODALS",
  ERROR_MODAL: "ERROR_MODAL",
  SET_SEARCH_MODE: "SET_SEARCH_MODE",
  SET_CURRENT_IDX: "SET_CURRENT_IDX",
  SEARCH: "SEARCH",
  DUPLICATE: "DUPLICATE",
  OPEN_PUBLISHED_PLAYLIST: "OPEN_PUBLISHED_PLAYLIST",
  SET_SORT_MODE: "SET_SORT_MODE",
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

export const CurrentModal = {
  NONE: "NONE",
  DELETE_LIST: "DELETE_LIST",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
  ERROR: "ERROR",
};

export const SearchMode = {
  HOME: "HOME",
  ALL_LISTS: "ALL_LISTS",
  USERS: "USERS",
};

export const SortMode = {
  LISTENS: "LISTENS",
  LIKES: "LIKES",
  DISLIKES: "DISLIKES",
  PUBLISH_DATE: "PUBLISH_DATE",
  NAME: "NAME",
  CREATION_DATE: "CREATION_DATE",
  LAST_EDIT_DATE: "LAST_EDIT_DATE",
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    currentModal: CurrentModal.NONE,
    idNamePairs: [],
    currentList: null,
    currentSongIndex: -1,
    currentSong: null,
    newListCounter: 0,
    listNameActive: false,
    listIdMarkedForDeletion: null,
    listMarkedForDeletion: null,
    searchMode: SearchMode.HOME,
    searchText: "",
    errorMessage: null,
    listIdMarkedForEdit: null,
    sortMode: SortMode.NAME,
  });
  const history = useNavigate();

  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
  const { auth } = useContext(AuthContext);
  console.log("auth: " + auth);

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case GlobalStoreActionType.SET_SEARCH_MODE: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: payload,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: payload.idNamePairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      // STOP EDITING THE CURRENT LIST
      case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      // CREATE A NEW LIST
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: payload.idNamePairs,
          currentList: payload.currentList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter + 1,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      // GET ALL THE LISTS SO WE CAN PRESENT THEM
      case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: payload,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        return setStore({
          currentModal: CurrentModal.DELETE_LIST,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: payload.id,
          listMarkedForDeletion: payload.playlist,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      // UPDATE A LIST
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: payload,
          currentSongIndex: payload && payload.songs.length > 0 ? 0 : -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      // START EDITING A LIST NAME
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: payload,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: true,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      //
      case GlobalStoreActionType.EDIT_SONG: {
        return setStore({
          currentModal: CurrentModal.EDIT_SONG,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      case GlobalStoreActionType.REMOVE_SONG: {
        return setStore({
          currentModal: CurrentModal.REMOVE_SONG,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: 0,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      case GlobalStoreActionType.ERROR_MODAL: {
        return setStore({
          currentModal: CurrentModal.ERROR_MODAL,
          errorMessage: payload.message,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }

      case GlobalStoreActionType.SET_CURRENT_IDX: {
        return setStore({
          currentModal: CurrentModal.ERROR_MODAL,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: payload,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }
      case GlobalStoreActionType.SEARCH: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: payload.playlists,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: payload.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }

      case GlobalStoreActionType.OPEN_PUBLISHED_PLAYLIST: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: payload.playlists,
          currentList: payload.currentList,
          currentSongIndex:
            payload.currentList && payload.currentList.songs.length > 0
              ? 0
              : -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: payload.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }

      case GlobalStoreActionType.DUPLICATE: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: payload.playlists,
          currentList: payload.currentList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: SearchMode.HOME,
          searchText: payload.searchText,
          listIdMarkedForEdit: null,
          sortMode: store.sortMode,
        });
      }

      case GlobalStoreActionType.SET_SORT_MODE: {
        return setStore({
          currentModal: CurrentModal.NONE,
          errorMessage: null,
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          currentSongIndex: store.currentSongIndex,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
          searchMode: store.searchMode,
          searchText: store.searchText,
          listIdMarkedForEdit: null,
          sortMode: payload,
        });
      }

      default:
        return store;
    }
  };

  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  // THIS FUNCTION PROCESSES CHANGING A LIST NAME
  store.changeListName = function (id, newName) {
    // GET THE LIST
    async function asyncChangeListName(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.name = newName;
        async function updateList(playlist) {
          try {
            response = await api.updatePlaylistById(playlist._id, playlist);
            store.search();
          } catch ({ response }) {
            store.showErrorModal(response.data.errorMessage);
          }
        }
        updateList(playlist);
      }
    }
    asyncChangeListName(id);
  };

  // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
  store.closeCurrentList = function () {
    storeReducer({
      type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
      payload: {},
    });
    tps.clearAllTransactions();
    // go back to the HomeWrapper which should take us to the homescreen
    // history("/");
  };

  // THIS FUNCTION CREATES A NEW LIST
  store.createNewList = function () {
    async function asyncCreateNewList() {
      let newListName = "Untitled" + store.newListCounter;
      let response = await api.createPlaylist(newListName, [], auth.user.email);

      async function asyncLoadIdNamePairs() {
        let response = await api.getPlaylistPairs();
        let pairsArray = response.data.playlists;
        console.log(pairsArray);
        storeReducer({
          type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
          payload: pairsArray,
        });

        //history("/");
      }
      asyncLoadIdNamePairs();
    }
    asyncCreateNewList();
  };

  store.duplicateCurrentList = function () {
    async function asyncDuplicateList() {
      const { name, songs } = store.currentList;
      let response = await api.createPlaylist(name, songs, auth.user.email);
      let playlist = response.data.playlist;

      async function asyncLoadIdNamePairs() {
        const response = await api.getPlaylistPairs();
        let pairsArray = response.data.playlists;
        storeReducer({
          type: GlobalStoreActionType.DUPLICATE,
          payload: { playlists: pairsArray, currentList: playlist },
        });
      }

      asyncLoadIdNamePairs();
    }

    history("/");

    asyncDuplicateList();
  };

  // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
  store.loadIdNamePairs = function () {
    async function asyncLoadIdNamePairs() {
      const response = await api.getPlaylistPairs();
      if (response.statusText === "OK") {
        let pairsArray = response.data.playlists;
        console.log(pairsArray);
        storeReducer({
          type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
          payload: pairsArray,
        });
      } else {
        console.log("API FAILED TO GET THE LIST PAIRS");
      }
    }
    asyncLoadIdNamePairs();
  };

  // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
  // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
  // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
  // showDeleteListModal, and hideDeleteListModal
  store.markListForDeletion = function (id) {
    async function getListToDelete(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        storeReducer({
          type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
          payload: { id: id, playlist: playlist },
        });
      }
    }
    getListToDelete(id);
  };
  store.unmarkListForDeletion = function () {
    store.hideModals();
  };

  store.publishCurrentList = function () {
    const updateStore = async () => {
      store.currentList.isPublished.status = true;

      const response = await api.updatePlaylistById(
        store.currentList._id,
        store.currentList
      );

      store.loadIdNamePairs();
      history("/");
    };

    updateStore();
  };
  store.deleteList = function (id) {
    async function processDelete(id) {
      let response = await api.deletePlaylistById(id);
      if (store.searchMode === SearchMode.HOME) store.loadIdNamePairs();
      else store.search(store.searchText);
      // history("/");
    }
    processDelete(id);
  };
  store.deleteMarkedList = function () {
    store.deleteList(store.listIdMarkedForDeletion);
    store.hideModals();
  };
  // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
  // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

  store.showEditSongModal = (songIndex, songToEdit) => {
    storeReducer({
      type: GlobalStoreActionType.EDIT_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToEdit },
    });
  };
  store.showRemoveSongModal = (songIndex, songToRemove) => {
    storeReducer({
      type: GlobalStoreActionType.REMOVE_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToRemove },
    });
  };

  store.setCurrentIdx = function (idx) {
    storeReducer({
      type: GlobalStoreActionType.SET_CURRENT_IDX,
      payload: idx,
    });
  };

  store.showErrorModal = (errorMessage) => {
    storeReducer({
      type: GlobalStoreActionType.ERROR_MODAL,
      payload: { message: errorMessage },
    });
  };

  store.hideModals = () => {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
      payload: {},
    });
  };
  store.isDeleteListModalOpen = () => {
    return store.currentModal === CurrentModal.DELETE_LIST;
  };
  store.isEditSongModalOpen = () => {
    return store.currentModal === CurrentModal.EDIT_SONG;
  };
  store.isRemoveSongModalOpen = () => {
    return store.currentModal === CurrentModal.REMOVE_SONG;
  };

  store.isErrorModalOpen = () => {
    return store.currentModal === CurrentModal.ERROR;
  };

  // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
  // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
  // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
  // moveItem, updateItem, updateCurrentList, undo, and redo

  store.setCurrentList = function (id) {
    async function asyncSetCurrentList(id) {
      try {
        let response = await api.getPlaylistById(id);
        let playlist = response.data.playlist;
        tps.clearAllTransactions();
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: playlist,
        });
      } catch (err) {
        console.log(err);
      }
    }
    asyncSetCurrentList(id);
  };

  // store.setCurrentListPublished = function (id) {
  //   async function asyncSetCurrentList(id) {
  //     try {
  //       let response = await api.getPublishedPlaylistsById(id);
  //       let playlist = response.data.playlist;
  //       tps.clearAllTransactions();
  //       storeReducer({
  //         type: GlobalStoreActionType.SET_CURRENT_LIST,
  //         payload: playlist,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   asyncSetCurrentList(id);
  // };

  store.setCurrentListPublished = function (id) {
    async function asyncSetCurrentList(id) {
      try {
        let response = await api.getPublishedPlaylistsById(id);
        let playlist = response.data.playlist;
        tps.clearAllTransactions();

        const asyncSearch = async (searchText) => {
          const searchMode = store.searchMode;
          if (searchMode === SearchMode.HOME) {
            const response = await api.searchOwnedPlaylists(
              searchText,
              store.sortMode
            );
            const playlists = response.data.playlists;
            storeReducer({
              type: GlobalStoreActionType.OPEN_PUBLISHED_PLAYLIST,
              payload: {
                playlists: playlists,
                searchText: searchText,
                currentList: playlist,
              },
            });
          } else if (searchMode === SearchMode.ALL_LISTS) {
            const response = await api.searchPublishedPlaylists(
              searchText,
              null,
              store.sortMode
            );
            const playlists = response.data.playlists;
            storeReducer({
              type: GlobalStoreActionType.OPEN_PUBLISHED_PLAYLIST,
              payload: {
                playlists: playlists,
                searchText: searchText,
                currentList: playlist,
              },
            });
          } else if (searchMode === SearchMode.USERS) {
            const response = await api.searchPublishedPlaylists(
              undefined,
              searchText,
              store.sortMode
            );
            const playlists = response.data.playlists;
            storeReducer({
              type: GlobalStoreActionType.OPEN_PUBLISHED_PLAYLIST,
              payload: {
                playlists: playlists,
                searchText: searchText,
                currentList: playlist,
              },
            });
          }
        };

        asyncSearch(store.searchText);
      } catch (err) {
        console.log(err);
      }
    }
    asyncSetCurrentList(id);
  };

  store.getPlaylistSize = function () {
    return store.currentList.songs.length;
  };
  store.addNewSong = function () {
    let index = this.getPlaylistSize();
    this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
  };
  // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
  // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
  store.createSong = function (index, song) {
    let list = store.currentList;
    list.songs.splice(index, 0, song);
    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
  // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
  store.moveSong = function (start, end) {
    let list = store.currentList;

    // WE NEED TO UPDATE THE STATE FOR THE APP
    if (start < end) {
      let temp = list.songs[start];
      for (let i = start; i < end; i++) {
        list.songs[i] = list.songs[i + 1];
      }
      list.songs[end] = temp;
    } else if (start > end) {
      let temp = list.songs[start];
      for (let i = start; i > end; i--) {
        list.songs[i] = list.songs[i - 1];
      }
      list.songs[end] = temp;
    }

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
  // FROM THE CURRENT LIST
  store.removeSong = function (index) {
    let list = store.currentList;
    list.songs.splice(index, 1);

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
  store.updateSong = function (index, songData) {
    let list = store.currentList;
    let song = list.songs[index];
    song.title = songData.title;
    song.artist = songData.artist;
    song.youTubeId = songData.youTubeId;

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };

  // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
  store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
    // ADD A SONG ITEM AND ITS NUMBER
    let song = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    let transaction = new CreateSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addMoveSongTransaction = function (start, end) {
    let transaction = new MoveSong_Transaction(store, start, end);
    tps.addTransaction(transaction);
  };
  // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
  store.addRemoveSongTransaction = () => {
    let index = store.currentSongIndex;
    let song = store.currentList.songs[index];
    let transaction = new RemoveSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addUpdateSongTransaction = function (index, newSongData) {
    let song = store.currentList.songs[index];
    let oldSongData = {
      title: song.title,
      artist: song.artist,
      youTubeId: song.youTubeId,
    };
    let transaction = new UpdateSong_Transaction(
      this,
      index,
      oldSongData,
      newSongData
    );
    tps.addTransaction(transaction);
  };
  store.updateCurrentList = function () {
    async function asyncUpdateCurrentList() {
      try {
        const response = await api.updatePlaylistById(
          store.currentList._id,
          store.currentList
        );
        if (response.data.success) {
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    asyncUpdateCurrentList();
  };
  store.setSearchMode = function (searchMode) {
    storeReducer({
      type: GlobalStoreActionType.SET_SEARCH_MODE,
      payload: searchMode,
    });
  };
  store.undo = function () {
    tps.undoTransaction();
  };
  store.redo = function () {
    tps.doTransaction();
  };
  store.canAddNewSong = function () {
    return store.currentList !== null;
  };
  store.canUndo = function () {
    return store.currentList !== null && tps.hasTransactionToUndo();
  };
  store.canRedo = function () {
    return store.currentList !== null && tps.hasTransactionToRedo();
  };
  store.canClose = function () {
    return store.currentList !== null;
  };

  store.search = function (searchText) {
    const asyncSearch = async (searchText) => {
      const searchMode = store.searchMode;
      if (searchMode === SearchMode.HOME) {
        const response = await api.searchOwnedPlaylists(
          searchText,
          store.sortMode
        );
        const playlists = response.data.playlists;
        storeReducer({
          type: GlobalStoreActionType.SEARCH,
          payload: { playlists: playlists, searchText: searchText },
        });
      } else if (searchMode === SearchMode.ALL_LISTS) {
        const response = await api.searchPublishedPlaylists(
          searchText,
          null,
          store.sortMode
        );
        const playlists = response.data.playlists;
        storeReducer({
          type: GlobalStoreActionType.SEARCH,
          payload: { playlists: playlists, searchText: searchText },
        });
      } else if (searchMode === SearchMode.USERS) {
        const response = await api.searchPublishedPlaylists(
          undefined,
          searchText,
          store.sortMode
        );
        const playlists = response.data.playlists;
        storeReducer({
          type: GlobalStoreActionType.SEARCH,
          payload: { playlists: playlists, searchText: searchText },
        });
      }
    };
    asyncSearch(searchText);
  };

  store.getAllPublishedPlaylists = function () {
    const aysncGetAllPublishedPlaylists = async () => {
      try {
        const response = await api.getAllPublishedPlaylists();
        const playlists = response.data.playlists;
        storeReducer({
          type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
          payload: playlists,
        });
      } catch (e) {
        console.log(e);
      }
    };

    aysncGetAllPublishedPlaylists();
  };

  store.postComment = function (id, text) {
    async function asyncPostComment(id, text) {
      let response = await api.postComment(id, text);
      let updatedPlaylist = response.data.playlist;

      storeReducer({
        type: GlobalStoreActionType.SET_CURRENT_LIST,
        payload: updatedPlaylist,
      });
    }
    asyncPostComment(id, text);
  };

  store.sortByName = () => {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT_MODE,
      payload: SortMode.NAME,
    });
  };

  store.sortByListens = () => {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT_MODE,
      payload: SortMode.LISTENS,
    });
  };

  store.sortByLikes = () => {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT_MODE,
      payload: SortMode.LIKES,
    });
  };

  store.sortByDislikes = () => {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT_MODE,
      payload: SortMode.DISLIKES,
    });
  };

  store.sortByPublishDate = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT_MODE,
      payload: SortMode.PUBLISH_DATE,
    });
  };

  store.sortByCreationDate = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT_MODE,
      payload: SortMode.CREATION_DATE,
    });
  };

  store.sortByLastEditDate = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT_MODE,
      payload: SortMode.LAST_EDIT_DATE,
    });
  };
  // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
  store.setIsListNameEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  store.postLikeStatus = function (id, likeStatus) {
    async function asyncPostLikeStatus(id, likeStatus) {
      let response = await api.postLikeStatus(id, likeStatus);
      let playlist = response.data.playlist;

      store.search(store.searchText);
    }

    asyncPostLikeStatus(id, likeStatus);
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
