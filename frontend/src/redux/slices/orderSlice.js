import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from "../../services/orderService";

// Async thunk to fetch orders from the API
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const res = await getOrders();
  return res.data;
});

// Redux slice for managing orders state
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    selectedOrder: null,
    loading: false,
  },
  // Reducer to set the selected order in the state
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
  // Extra reducers to handle the async thunk actions for fetching orders
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
