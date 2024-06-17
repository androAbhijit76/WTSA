import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";
import { toast } from "react-toastify";

export const createAPI = createAsyncThunk(
  "create/product/create",
  async (payload) => {
    const response = await axiosInstance.post("/product/create", payload);
    console.log(response.data, "createapi");
    return response.data;
  }
);

const CreateSlice = createSlice({
  name: "create",
  initialState: {
    status: "idle",
    redirect: null,
  },
  reducers: {
    redirection(state, action) {
      state.redirect = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAPI.pending, (state, action) => {
        state.status = "loading..";
      })
      .addCase(createAPI.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.status === 200) {
          toast.success(action.payload.message);
          state.redirect = "/products";
        } else {
          if (action.payload.status === 201) {
            toast.error(action.payload.message);
          }
        }
      })
      .addCase(createAPI.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});
export const { redirection } = CreateSlice.actions;
export default CreateSlice.reducer;
