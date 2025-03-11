import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../slice/name';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

export const createOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/createOrder`,
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      return response.order;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при создании заказа');
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      if (!response.orders.length) {
        return rejectWithValue('Заказ не найден');
      }
      return response.orders[0];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при получении заказа');
    }
  }
);
