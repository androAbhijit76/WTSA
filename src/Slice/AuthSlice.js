import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";
import { toast } from "react-toastify";

export const registrationAPI = createAsyncThunk(
  "auth/user/signup",
  async (formdata) => {
    const response = await axiosInstance.post("/user/signup", formdata);
    console.log(response.data, "registrationapi");
    return response.data;
  }
);

export const loginAPI = createAsyncThunk(
  "auth/user/signin",
  async (payload) => {
    const response = await axiosInstance.post("/user/signin", payload);
    console.log(response.data, "loginapi");
    return response.data;
  }
);

export const profileAPI = createAsyncThunk(
  "auth/user/profile-details",
  async () => {
    const response = await axiosInstance.get("/user/profile-details");
    console.log(response.data, "profileapi");
    return response.data;
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    isLoading: false,
    error: null,
    profileData: [],
    directionLogin: null,
    direct: null,
    isLogin: false,
  },
  reducers: {
    redirect(state, action) {
      state.directionLogin = action.payload;
    },
    redirection(state, action) {
      state.direct = action.payload;
    },
    isLogout(state, action) {
      localStorage.removeItem("token");
      state.isLogin = false;
    },
    checkToken: (state, { payload }) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.isLogin = true;
      }
    },
  },

  extraReducers: (bulder) => {
    bulder
      .addCase(registrationAPI.pending, (state, action) => {
        state.status = "loading..";
      })
      .addCase(registrationAPI.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.status === 200) {
          toast.success(action.payload.message);
          state.directionLogin = "/login";
        } else {
          if (action.payload.status === 201) {
            toast.error(action.payload.message);
          }
        }
      })
      .addCase(registrationAPI.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(loginAPI.pending, (state, action) => {
        state.status = "loading..";
      })
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.status === 200) {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("image", action.payload.data?.profile_pic);
          state.isLogin = true;
          toast.success(action.payload.message);
          state.direct = "/";
        } else {
          if (action.payload.status === 201) {
            toast.error(action.payload.message);
          }
        }
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(profileAPI.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(profileAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload;
        state.error = null;
      })
      .addCase(profileAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.profileData = [];
      });
  },
});
export const { redirect, redirection, isLogout, checkToken } =
  AuthSlice.actions;
export default AuthSlice.reducer;
