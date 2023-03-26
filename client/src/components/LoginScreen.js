import { useContext, useEffect } from "react";
import AuthContext from "../auth";

// import Copyright from "./Copyright";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ErrorModal from "./ErrorModal";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://umairhoda.com/">
        Umair Hoda
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function LoginScreen() {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    window.songId = undefined;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.loginUser(
      formData.get("email").toLowerCase(),
      formData.get("password")
    );
  };

  const primary_color = "#051622";
  const theme = createTheme({
    palette: {
      primary: {
        main: "#DEB992",
      },
      secondary: { main: "#22BF19" },
      grey: { main: "#22BF19" },
    },
    overrides: {
      MuiOutlinedInput: {
        root: {
          position: "relative",
          "& $notchedOutline": {
            borderColor: "#DEB992",
          },
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: "#DEB992",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              borderColor: "#DEB992",
            },
          },
          "&$focused $notchedOutline": {
            borderColor: "#DEB992",
            borderWidth: 2,
          },
        },
      },
      MuiFormLabel: {
        root: {
          // "&$focused": {
          color: "red",
          // }
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="form-container">
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1BA098" }}>
              <LockOutlinedIcon />
            </Avatar>

            <h1 className="splash-title">Sign in</h1>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                size="small"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="primary"
                InputLabelProps={{ className: "textfield-label" }}
                InputProps={{ className: "textfield" }}
                size="small"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ color: "#DEB992" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#1BA098",
                  "&:hover": { backgroundColor: "#051622" },
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4, color: "#DEB992" }} />
        </Container>
        <ErrorModal />
      </div>
    </ThemeProvider>
  );
}
