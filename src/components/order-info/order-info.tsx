import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '../../services/slice/ingredients/ingredientsSlice';
import {
  orderSliceSelectors,
  orderSliceActions
} from '../../services/slice/order/orderSlice';
import { useParams } from 'react-router-dom';
import { useActionCreators } from '../../services/hooks/hooks';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const { getOrderByNumber } = useActionCreators(orderSliceActions);

  const orderData = useSelector(orderSliceSelectors.getOrderByNumber);

  const ingredients = useSelector(ingredientsSelectors.getIngredients);

  useEffect(() => {
    if (!orderData || orderData.number !== Number(number)) {
      getOrderByNumber(Number(number));
    }
  }, [number, orderData, getOrderByNumber]);

  const orderInfo = useMemo(() => {
    if (!orderData || !orderData.ingredients || !ingredients.length)
      return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          if (!acc[item]) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          } else {
            acc[item].count++;
          }
        }
        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
