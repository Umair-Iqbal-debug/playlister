import { Alert, Box, Button, Modal } from "@mui/material";
import React, { useContext } from "react";
import GlobalStoreContext from "../store";

function ErrorModalHomeScreen() {
  const { store } = useContext(GlobalStoreContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  let errorMessage = "";
  if (store.errorMessage !== null) {
    errorMessage = store.errorMessage;
  }

  const handleCloseBtn = () => {
    store.showErrorModal("");
  };

  return (
    <Modal open={errorMessage.length > 0}>
      <Box sx={style}>
        <Alert severity="error">{errorMessage}</Alert>
        <Button
          variant="outlined"
          sx={{ marginTop: "1rem" }}
          onClick={handleCloseBtn}
        >
          OK
        </Button>
      </Box>
    </Modal>
  );
}

export default ErrorModalHomeScreen;
