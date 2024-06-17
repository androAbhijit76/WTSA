import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";
import { toast } from "react-toastify";

export const productAPI = createAsyncThunk("product/product/list", async () => {
  const response = await axiosInstance.post("/product/list");
  console.log(response.data, "productapi");
  return response.data;
});

export const deleteAPI = createAsyncThunk(
  "product/product/remove",
  async (formdata) => {
    const response = await axiosInstance.post("/product/remove", formdata);
    console.log(response.data);
    return response.data;
  }
);
export const detailsAPI = createAsyncThunk(
  "product/product/detail",
  async (id) => {
    const response = await axiosInstance.get(`/product/detail/${id}`);
    return response.data.data;
  }
);
export const updateAPI = createAsyncThunk(
  "product/product/update",
  async (formdata) => {
    const response = await axiosInstance.post("product/update", formdata);
    return response.data.data;
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    productData: [],
    detailsData: [],
    status: "idle",
    error: null,
    redirectTo: null,
  },
  reducers: {
    redirectionTo(state, action) {
      state.redirectTo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productAPI.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(productAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productData = action.payload;
        state.error = null;
      })
      .addCase(productAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.productData = [];
      })

      .addCase(deleteAPI.pending, (state, action) => {
        state.status = "loading..";
      })
      .addCase(deleteAPI.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteAPI.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(detailsAPI.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(detailsAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailsData = action.payload;
        state.error = null;
      })
      .addCase(detailsAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.detailsData = [];
      })

      .addCase(updateAPI.pending, (state, action) => {
        state.status = "loading..";
      })
      .addCase(updateAPI.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.status === 200) {
          toast.success(action.payload.message);
          state.redirectTo = "/products";
        } else {
          if (action.payload.status === 201) {
            toast.error(action.payload.message);
          }
        }
      })
      .addCase(updateAPI.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});
export const { redirectionTo } = ProductSlice.actions;
export default ProductSlice.reducer;
