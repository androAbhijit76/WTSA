

import React, { useState } from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DrawerComp from "../../../COMPONENTS/DrawerComp";
import { isLogout } from "../../../Slice/AuthSlice";
import { profile_pic } from "../../../Helper/Helper";
import { IoIosArrowDropdown } from "react-icons/io";

function Header() {
  const image = localStorage.getItem("image");
  const [show, setShow] = useState(null);
  const [productMenuAnchor, setProductMenuAnchor] = useState(null);

  const token = localStorage.getItem("token");
  const { isLogin } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    dispatch(isLogout());
    setShow(null); // Close the profile menu after logout
  };

  const handleProfileMenuClick = (e) => {
    setShow(show ? null : e.currentTarget);
  };

  return (
    <AppBar>
      <Toolbar>
        {isMatch ? (
          <DrawerComp />
        ) : (
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={2}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "700", marginLeft: "20px" }}
              >
                <img
                  src="https://img.freepik.com/free-psd/gradient-versus-logo-template_23-2151514114.jpg?t=st=1718507843~exp=1718511443~hmac=64c8e602c39b149ce814d70c9290f8c8b545a26b6f34ab09149eb60ab58669fd&w=740"
                  alt="logo" height={58} style={{borderRadius:"50%"}}
                />
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={10}
              sm={10}
              md={10}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Tabs
                sx={{ marginLeft: "auto" }}
                textColor="inherit"
                indicatorColor="secondary"
              >
                <Button
                  sx={{ fontSize: "18px" }}
                  color="inherit"
                  component={Link}
                  to="/"
                >
                  User/DashBoard
                </Button>
                <Button
                  sx={{ fontSize: "18px" }}
                  color="inherit"
                  component={Link}
                  to="/products"
                >
                  Product
                </Button>

                <Button
                  sx={{ fontSize: "18px" }}
                  color="inherit"
                  component={Link}
                  to="/create"
                >
                  Create
                </Button>

                {isLogin && token ? (
                  <>
                    <Button
                      sx={{ fontSize: "18px" }}
                      color="inherit"
                      onClick={handleProfileMenuClick}
                    >
                      <img
                        src={profile_pic(image)}
                        alt="profile"
                        height={"50px"}
                        width={"50px"}
                        style={{ marginLeft: "auto", borderRadius: "50%" }}
                      />
                      <IoIosArrowDropdown />
                    </Button>
                    <Menu
                      onClose={() => setShow(null)}
                      open={Boolean(show)}
                      anchorEl={show}
                    >
                      <MenuItem
                        sx={{ fontSize: "18px" }}
                        component={Link}
                        to="/create"
                        color="inherit"
                      >
                        Create
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "18px" }}
                        component={Link}
                        to="/login"
                        color="inherit"
                        onClick={handleLogout}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    sx={{ fontSize: "18px" }}
                    color="inherit"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                )}
              </Tabs>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
