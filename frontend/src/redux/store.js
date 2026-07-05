import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orderSlice";

// Create the Redux store and configure it with the order reducer
export const store = configureStore({
  reducer: {
    orders: orderReducer,
  },
});
