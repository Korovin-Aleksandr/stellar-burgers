import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from '../name';
import { createOrder, getOrderByNumber } from '../../thunk/order';

type orderState = {
  infoOrderbyNumber: TOrder | null;
  newOrder: TOrder | null;
  requestStatus: RequestStatus;
};

const initialState: orderState = {
  infoOrderbyNumber: null,
  newOrder: {} as TOrder,
  requestStatus: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.newOrder = null;
      state.infoOrderbyNumber = null;
      state.requestStatus = RequestStatus.Idle;
    }
  },
  selectors: {
    getNewOrder: (state) => state.newOrder,
    getOrderStatus: (state) => state.requestStatus,
    getOrderByNumber: (state) => state.infoOrderbyNumber
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.newOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.infoOrderbyNumber = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const orderSliceActions = {
  ...orderSlice.actions,
  createOrder,
  getOrderByNumber
};
export const orderSliceSelectors = orderSlice.selectors;
export default orderSlice.reducer;
