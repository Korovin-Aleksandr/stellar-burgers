import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENT_SLICE_NAME } from '../slice/name';

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENT_SLICE_NAME}/fetchIngredients`,
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);
