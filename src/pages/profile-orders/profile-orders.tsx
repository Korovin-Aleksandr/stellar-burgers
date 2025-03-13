import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useActionCreators } from '../../services/hooks/hooks';
import {
  ordersUserActions,
  ordersUserSelector
} from '../../services/slice/ordersUser/ordersUserSlice';
import { ingredientsActions } from '../../services/slice/ingredients/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const { fetchIngredients } = useActionCreators(ingredientsActions);
  const { fetchUserOrders } = useActionCreators(ordersUserActions);
  const orders = useSelector(ordersUserSelector.getOrders);

  useEffect(() => {
    if (orders.length === 0) {
      fetchIngredients();
      fetchUserOrders();
    }
  }, [orders, fetchUserOrders]);

  return <ProfileOrdersUI orders={orders} />;
};
