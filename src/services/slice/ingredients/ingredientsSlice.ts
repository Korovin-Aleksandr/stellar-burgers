import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import { INGREDIENT_SLICE_NAME } from '../name';
import { fetchIngredients } from '../../thunk/ingredients';

type IngredientsState = {
  data: TIngredient[];
  requestStatus: RequestStatus;
};

const initialState: IngredientsState = {
  data: [],
  requestStatus: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: INGREDIENT_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.data,
    getIngredientsStatus: (state) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.requestStatus = RequestStatus.Success;
          state.data = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const ingredientsSelectors = ingredientsSlice.selectors;

export const ingredientsActions = {
  ...ingredientsSlice.actions,
  fetchIngredients
};

export default ingredientsSlice;
