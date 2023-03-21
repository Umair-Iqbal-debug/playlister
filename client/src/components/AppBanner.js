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
import YouTubeIcon from "@mui/icons-material/YouTube";
import { color } from "@mui/system";

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
      <MenuItem onClick={handleMenuClose} component={Link} to="/login">
        Login
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/register">
        Create New Account
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
    if (loggedIn) return <div style={{ color: "#deb992" }}>{userInitials}</div>;
    else return <AccountCircle sx={{ color: "#deb992" }} />;
  }

  return (
    <Box>
      <AppBar sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ color: "#deb992" }}>
            <YouTubeIcon />
          </Typography>
          <Box sx={{ display: { md: "flex", marginLeft: "auto" } }}>
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
