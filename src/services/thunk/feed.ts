import { getFeedsApi, TFeedsResponse } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../slice/name';

export const fetchOrders = createAsyncThunk(
  `${FEED_SLICE_NAME}/fetchOrders`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
