import { getOrdersApi } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await getOrdersApi();
    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка загрузки заказов'
    );
  }
});