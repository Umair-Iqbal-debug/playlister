import { useContext } from "react";
import AuthContext from "../auth";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ErrorModal from "./ErrorModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function RegisterScreen() {
  const { auth } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.registerUser(
      formData.get("firstName"),
      formData.get("lastName"),
      formData.get("email").toLowerCase(),
      formData.get("password"),
      formData.get("passwordVerify"),
      formData.get("username")
    );
  };

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

  const primary_color = "#051622";
  const textcolor = "#deb992";

  return (
    <ThemeProvider theme={theme}>
      <div
        className="form-container"
        // style={{ backgroundColor: primary_color }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
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
            <h1 className="splash-title">Sign up</h1>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordVerify"
                    label="Password Verify"
                    type="password"
                    id="passwordVerify"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ErrorModal />
        </Container>
      </div>
    </ThemeProvider>
  );
}
