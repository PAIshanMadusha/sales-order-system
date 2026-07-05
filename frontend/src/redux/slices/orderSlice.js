import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the order slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    selectedOrder: null,
  },
  // Define the reducers for the order slice
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
});

// Export the actions and reducer from the order slice
export const { setOrders, setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
