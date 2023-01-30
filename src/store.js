import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice/authSlice";
import ProductReducer from "./features/product/ProductSlice";

import FilterReducer from "./features/filter/FilterSearch";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: ProductReducer,
    filter: FilterReducer,
  },
});
