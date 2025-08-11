import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "store/slices/searchSlice";
import cartReducer from "store/slices/cartSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
