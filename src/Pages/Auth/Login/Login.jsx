import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaLock } from "react-icons/fa";
import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI, redirection } from "../../../Slice/AuthSlice";

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

export default function Login() {
  const { status, direct } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    dispatch(loginAPI(formdata));
  };

  useEffect(() => {
    if (direct) {
      navigate(direct);
      dispatch(redirection(null));
    }
  }, [direct, redirection, dispatch]);
  return (
    <>
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
              Sign In
            </Typography>
            <Box
              noValidate
              sx={{ mt: 3 }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email format",
                  },
                })}
                label="Your Email"
                fullWidth
                margin="normal"
                variant="outlined"
                error={errors.email}
                helperText={errors.email && errors.email.message}
              />

              <TextField
                {...register("password", { required: true, maxLength: 20 })}
                required
                label="Password"
                fullWidth
                error={errors.password}
                helperText={errors.password && "Password is required"}
                variant="outlined"
                autoFocus
              />
              {status === "idle" ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                >
                  Loading...
                </Button>
              )}
              <Grid container mt={1}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/regis"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>

            <Typography></Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
