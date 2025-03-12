import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Ошибка загрузки заказов пользователя'
      );
    }
  }
);
