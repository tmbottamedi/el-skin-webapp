import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "store/slices/searchSlice";
import cartReducer from "store/slices/cartSlice";
import productsReducer from "store/slices/productsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
