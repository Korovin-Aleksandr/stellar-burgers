import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { ORDERS_USER_SLICE_NAME } from '../name';
import { fetchUserOrders } from '../../thunk/userOrders';

type ordersUserState = {
  orders: TOrder[];
  requestStatus: RequestStatus;
};

const initialState: ordersUserState = {
  orders: [],
  requestStatus: RequestStatus.Idle
};

export const ordersUserSlice = createSlice({
  name: ORDERS_USER_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const ordersUserSelector = ordersUserSlice.selectors;

export const ordersUserActions = {
  ...ordersUserSlice.actions,
  fetchUserOrders
};

export default ordersUserSlice.reducer;
