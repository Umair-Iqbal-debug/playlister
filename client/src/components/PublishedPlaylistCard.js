import * as React from "react";
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

export default function PublishedPlaylistCard({ playlist }) {
  const [likeStatus, setLikeStatus] = React.useState(0);

  const { name, likeCount, dislikeCount, listens, _id } = playlist;

  const { store } = React.useContext(GlobalStoreContext);

  let expanded = false;

  let color = "#d4d4f5";
  if (store && store.currentList && store.currentList._id == _id) {
    color = "#d4af37";
    expanded = true;
  }

  const handleLikeBtn = (e) => {
    e.stopPropagation();
    setLikeStatus((prevStatus) => {
      if (prevStatus === 1) return 0;
      return 1;
    });
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    setLikeStatus((prevStatus) => {
      if (prevStatus === -1) return 0;
      return -1;
    });
  };

  const handLoadList = (e) => {
    if (store.currentList && store.currentList._id === _id) {
      store.closeCurrentList();
    } else {
      store.setCurrentListPublished(_id);
    }
  };

  const handleDuplicate = (e) => {
    e.stopPropagation();

    //store.duplicate()
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    //store.delete()
  };

  const formateDate = (date) => "Jan 5, 2019";

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
                <IconButton onClick={handleLikeBtn}>
                  {likeStatus === 1 ? (
                    <ThumbUpAltIcon />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )}
                </IconButton>
                <Typography sx={{ display: "inline" }}>{likeCount}</Typography>
                <IconButton onClick={handleDislike}>
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
            {/* {store.currentList &&
              store.currentList._id === playlist._id &&
              store.currentList.songs.map((song, idx) => {
                return <SongCard song={song} index={idx} />;
              })} */}

            <WorkspaceScreen playlist={playlist} />
            <Box>
              <Button
                sx={{ float: "right" }}
                onClick={handleDelete}
                variant="outlined"
              >
                Delete
              </Button>
              <Button
                sx={{ float: "right" }}
                onClick={handleDuplicate}
                variant="outlined"
              >
                duplicate
              </Button>
            </Box>
          </Box>
          {expanded && details}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
