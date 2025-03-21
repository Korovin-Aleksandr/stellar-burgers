import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { CONSTRUCTOR_SLICE_NAME } from '../name';
import { v4 as uuidv4 } from 'uuid';

type ingredientList = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ingredientList = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredientToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.ingredients = state.ingredients.filter(
            (item) => item.type !== 'bun'
          );
          state.ingredients.push(action.payload);
        } else {
          const sameIngredientsCount = state.ingredients.filter(
            (item) => item.name === action.payload.name
          ).length;
          state.ingredients.push({
            ...action.payload,
            count: sameIngredientsCount + 1
          });
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredientFromOrder: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const items = state.ingredients.filter((item) => item.type !== 'bun');
      if (index > 0) {
        [items[index], items[index - 1]] = [items[index - 1], items[index]];
      }
      state.ingredients = [
        ...state.ingredients.filter((item) => item.type === 'bun'),
        ...items
      ];
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const items = state.ingredients.filter((item) => item.type !== 'bun');
      if (index < items.length - 1) {
        [items[index], items[index + 1]] = [items[index + 1], items[index]];
      }
      state.ingredients = [
        ...state.ingredients.filter((item) => item.type === 'bun'),
        ...items
      ];
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorIngredients: (state) => state.ingredients,
    getConstructorBun: (state) => state.bun
  }
});

export const construcnorAction = burgerConstructorSlice.actions;
export const construcnorSelectors = burgerConstructorSlice.selectors;
export default burgerConstructorSlice;
