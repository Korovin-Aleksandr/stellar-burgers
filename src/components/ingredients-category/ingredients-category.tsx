import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from 'react-redux';
import { construcnorSelectors } from '../../services/slice/burder-constructor/burgerConstructorSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const bun = useSelector(construcnorSelectors.getConstructorBun);
  const constructorIngredients = useSelector(
    construcnorSelectors.getConstructorIngredients
  );

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};

    constructorIngredients.forEach((ingredient: TConstructorIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    if (bun) {
      counters[bun._id] = 2;
    }

    return counters;
  }, [constructorIngredients, bun]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
