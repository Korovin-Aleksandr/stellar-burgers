import { RequestStatus, TOrder } from '@utils-types';
import { FEED_SLICE_NAME } from '../name';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders } from '../../thunk/feed';

type feedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  requestStatus: RequestStatus;
};

const initialState: feedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  requestStatus: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const feedSelectors = feedSlice.selectors;

export const feedActions = {
  ...feedSlice.actions,
  fetchOrders
};

export default feedSlice;
