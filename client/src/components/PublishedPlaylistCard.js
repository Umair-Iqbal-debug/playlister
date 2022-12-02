import * as React from "react";
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Button, IconButton, Box, Card } from "@mui/material";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import GlobalStoreContext from "../store";
import SongCard from "./SongCard";
import WorkspaceScreen from "./WorkspaceScreen";
import Toolbar from "./Toolbar";
import AuthContext from "../auth";

export default function PublishedPlaylistCard({ playlist }) {
  const { name, likeCount, dislikeCount, listens, _id, likes } = playlist;
  const { store } = React.useContext(GlobalStoreContext);
  const { auth } = React.useContext(AuthContext);

  React.useEffect(() => {
    let defaultLikeStatus = 0;
    if (auth.loggedIn) {
      let exisistingRecord = likes.find(
        (likeObj) =>
          JSON.stringify(likeObj.userId) === JSON.stringify(auth.user._id)
      );
      if (exisistingRecord) defaultLikeStatus = exisistingRecord.likeStatus;
      setLikeStatus(defaultLikeStatus);
    }
  });

  const [likeStatus, setLikeStatus] = useState(0);

  let expanded = false;

  let color = "#d4d4f5";
  if (
    store &&
    store.currentList &&
    JSON.stringify(store.currentList._id) === JSON.stringify(_id)
  ) {
    color = "#d4af37";
    expanded = true;
  }

  const handleLikeBtn = (e) => {
    e.stopPropagation();
    if (likeStatus === 1) store.postLikeStatus(_id, 0);
    else store.postLikeStatus(_id, 1);
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    if (likeStatus === -1) store.postLikeStatus(_id, 0);
    else store.postLikeStatus(_id, -1);
  };

  const handLoadList = (e) => {
    if (store.currentList && store.currentList._id === _id) {
      store.closeCurrentList();
    } else {
      store.setCurrentListPublished(_id);
    }
  };

  const formateDate = (date) => {
    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const tokens = date.split("-");
    let years = tokens[0];
    let month = MONTHS[Number(tokens[1]) - 1];
    let day = tokens[2].substring(0, 2);

    return `${month} ${day}, ${years}`;
  };

  const details = (
    <div style={{ display: "relative", marginTop: "auto" }}>
      <Typography
        sx={{
          width: "50%",
          position: "absolute",
        }}
      >
        Published:{" "}
        <span style={{ color: "green" }}>
          {formateDate(playlist.isPublished.date)}
        </span>
      </Typography>
      <Typography sx={{ display: "inline", float: "right" }}>
        Listens: <span style={{ color: "red" }}>{listens}</span>
      </Typography>
    </div>
  );

  return (
    <div style={{ marginBottom: "0.5rem" }} onClick={handLoadList}>
      <Accordion
        expanded={expanded}
        sx={{
          backgroundColor: color,
          minHeight: "8rem",
          display: "relative",
        }}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <div
            id={`detail-${playlist._id}`}
            style={{
              position: "relative",
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>

            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <div>
                <IconButton disabled={!auth.loggedIn} onClick={handleLikeBtn}>
                  {likeStatus === 1 ? (
                    <ThumbUpAltIcon />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )}
                </IconButton>
                <Typography sx={{ display: "inline" }}>{likeCount}</Typography>
                <IconButton disabled={!auth.loggedIn} onClick={handleDislike}>
                  {likeStatus === -1 ? (
                    <ThumbDownAltIcon />
                  ) : (
                    <ThumbDownOffAltIcon />
                  )}
                </IconButton>
                <Typography sx={{ display: "inline" }}>
                  {dislikeCount}
                </Typography>
              </div>
            </div>
            <div style={{ width: "100%", height: "20px" }}>
              <Typography>
                By:
                <span style={{ textDecoration: "underline", color: "blue" }}>
                  {playlist.user.username}
                </span>
              </Typography>
            </div>

            {!expanded && details}
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <WorkspaceScreen playlist={playlist} />
          </Box>
          <Toolbar />
          {expanded && details}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
