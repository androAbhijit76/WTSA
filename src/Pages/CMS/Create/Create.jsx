import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createAPI } from "../../../Slice/CreateSlice";
import { useNavigate } from "react-router-dom";
import { redirection } from "../../../Slice/AuthSlice";

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

export default function Create() {
  const navigate = useNavigate();
  const { status, redirect } = useSelector((state) => state.Create);
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("image", data.image[0]);
    dispatch(createAPI(formdata));
  };
  useEffect(() => {
    navigate(redirect);
    dispatch(redirection(null));
  }, [dispatch, redirect, redirection]);
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CssBaseline />
          <Box mt={12}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Create
            </Typography>
            <Box
              noValidate
              sx={{ mt: 3 }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                {...register("title", { required: true })}
                fullWidth
                label="Title"
                error={errors.title}
                helperText={errors.title && "Title is required"}
                autoFocus
              />

              <TextField
                {...register("description", { required: true })}
                fullWidth
                label="Description"
                error={errors.description}
                helperText={errors.description && "Description is required"}
                autoFocus
              />

              <TextField
                {...register("image", { required: true, maxLength: 20 })}
                fullWidth
                label="Image"
                error={!image && errors.image}
                helperText={!image && errors.image && "Image is required"}
                onChange={(e) => setImage(e.target.files[0])}
                autoFocus
                type="file"
              />
              {image && (
                <img src={URL.createObjectURL(image)} alt="" height="180px" />
              )}

              {status === "idle" ? (
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                >
                  Loading...
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
