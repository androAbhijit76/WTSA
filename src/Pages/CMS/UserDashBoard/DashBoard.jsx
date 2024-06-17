import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileAPI } from "../../../Slice/AuthSlice";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { profile_pic } from "../../../Helper/Helper";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function DashBoard() {
  const { profileData } = useSelector((state) => state.Auth);
  console.log(profileData, "profiledata");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileAPI());
  }, [dispatch]);

  return (
    <div
      style={{
        marginBottom: "140px",
        justifyContent: "center",
        display: "flex",
        marginTop: "1rem",
      }}
    >
      <Box
        sx={{
          marginTop: { xs: "2rem", md: "10rem" },
          width: { xs: "90%", sm: "60%", md: "50%", lg: "30%" },
        }}
      >
        <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={12}>
              <img
                src={profile_pic(profileData?.data?.profile_pic)}
                alt=""
                height={"270px"}
                width={"250px"}
                style={{ marginTop: "20px", borderRadius: "50%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6" sx={{ color: "black" }}>
                  First Name: <b>{profileData?.data?.first_name}</b>{" "}
                </Typography>
                <Typography variant="h6" sx={{ color: "black" }}>
                  Last Name: <b>{profileData?.data?.last_name}</b>{" "}
                </Typography>
                <Typography variant="h6" sx={{ color: "black" }}>
                  Email Id: <b>{profileData?.data?.email}</b>{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Typography sx={{ paddingLeft: "8px", color: "black" }}>
                  <FacebookIcon />
                </Typography>
                <Typography sx={{ paddingLeft: "8px", color: "black" }}>
                  <TwitterIcon />
                </Typography>
                <Typography sx={{ paddingLeft: "8px", color: "black" }}>
                  <InstagramIcon />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
