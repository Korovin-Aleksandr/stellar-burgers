import { getIngredientsApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { INGREDIENT_SLICE_NAME } from '../slice/name';

export const fetchIngredients = createAsyncThunk<TIngredient[], void, {}>(
  `${INGREDIENT_SLICE_NAME}/fetchIngredients`,
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);
