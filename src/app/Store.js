import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Slice/AuthSlice";
import CreateSlice from "../Slice/CreateSlice";
import ProductSlice from "../Slice/ProductSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Create: CreateSlice,
    Product: ProductSlice,
  },
});
export default store;
