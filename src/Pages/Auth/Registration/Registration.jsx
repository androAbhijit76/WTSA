import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registrationAPI } from "../../../Slice/AuthSlice";
import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Registration() {
  const [profile_pic, setProfile_pic] = useState();
  const { status, directionLogin } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (directionLogin) {
      navigate(directionLogin);
      dispatch(redirect(null));
    }
  }, [directionLogin, redirect, dispatch]);

  const [error, setError] = React.useState("");
  const validation = () => {
    const error = {};
    if (!user.first_name) {
      error.first_name = "Fist name is required";
    }
    if (!user.last_name) {
      error.last_name = "Last name is required";
    }
    if (!user.email) {
      error.email = "Email is required";
    }
    if (!user.password) {
      error.password = "Password is required";
    }
    if (!profile_pic) {
      error.profile_pic = "Profile Picture is required";
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validation());
    const formdata = new FormData();
    formdata.append("first_name", user.first_name);
    formdata.append("last_name", user.last_name);
    formdata.append("email", user.email);
    formdata.append("password", user.password);
    formdata.append("profile_pic", profile_pic);
    dispatch(registrationAPI(formdata));
    setUser("");
  };
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "first_name") {
      if (value.length === 0) {
        setError({ ...error, first_name: "First name is required" });
        setUser({ ...user, first_name: "" });
      } else {
        setError({ ...error, first_name: "" });
        setUser({ ...user, first_name: value });
      }
    }

    if (name === "last_name") {
      if (value.length === 0) {
        setError({ ...error, last_name: "Last name is required" });
        setUser({ ...user, last_name: "" });
      } else {
        setError({ ...error, last_name: "" });
        setUser({ ...user, last_name: value });
      }
    }

    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email is required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "Password is required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  value={user.first_name}
                />
                <span style={{ color: "red" }}>
                  {""}
                  {error.first_name}
                  {""}
                </span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={user.last_name}
                />
                <span style={{ color: "red" }}>
                  {""}
                  {error.last_name}
                  {""}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={user.email}
                />
                <span style={{ color: "red" }}>
                  {""}
                  {error.email}
                  {""}
                </span>
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
                  onChange={handleChange}
                  value={user.password}
                />
                <span style={{ color: "red", marginLeft: "auto" }}>
                  {""}
                  {error.password}
                  {""}
                </span>
                <div>
                  <input
                    type="file"
                    onChange={(e) => setProfile_pic(e.target.files[0])}
                  />
                </div>
                <span style={{ color: "red" }}>
                  {""}
                  {error.profile_pic}
                  {""}
                </span>
                {profile_pic && (
                  <img
                    src={URL.createObjectURL(profile_pic)}
                    alt=""
                    height="180px"
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {status === "idle" ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Loading...
              </Button>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
