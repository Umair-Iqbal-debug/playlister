import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function AppBanner() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    if (store.currentList !== null) {
      store.closeCurrentList();
    }
    auth.logoutUser();
  };

  const menuId = "primary-search-account-menu";
  const loggedOutMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login">Login</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/register">Create New Account</Link>
      </MenuItem>
    </Menu>
  );
  const loggedInMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  let menu = loggedOutMenu;
  if (auth.loggedIn) {
    menu = loggedInMenu;
  }

  function getAccountMenu(loggedIn) {
    let userInitials = auth.getUserInitials();
    console.log("userInitials: " + userInitials);
    if (loggedIn) return <div>{userInitials}</div>;
    else return <AccountCircle />;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#e0e0e0",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#e0e0e0" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ color: "red" }}>
            Playlister
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex", marginLeft: "auto" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {getAccountMenu(auth.loggedIn)}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {menu}
    </Box>
  );
}
