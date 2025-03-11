import { getOrdersApi } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await getOrdersApi();
    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка загрузки заказов'
    );
  }
});