import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slice/ingredients/ingredientsSlice';
import { burgerConstructorSlice } from './slice/burder-constructor/burgerConstructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import userSlice from './slice/user/userSlice';
import feedSlice from './slice/feeds/feed';
import { orderSlice } from './slice/order/orderSlice';
import { ordersUserSlice } from './slice/ordersUser/ordersUserSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersUserSlice.name]: ordersUserSlice.reducer
});
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
