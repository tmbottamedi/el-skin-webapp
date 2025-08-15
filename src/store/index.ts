import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "store/slices/searchSlice";
import cartReducer from "store/slices/cartSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
