import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { construcnorAction } from '../../services/slice/burder-constructor/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(construcnorAction.moveIngredientDown(index));
    };

    const handleMoveUp = () => {
      dispatch(construcnorAction.moveIngredientUp(index));
    };

    const handleClose = () => {
      dispatch(construcnorAction.removeIngredientFromOrder(ingredient.id));
    };
    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
