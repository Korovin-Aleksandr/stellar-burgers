import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActionCreators } from '../../services/hooks/hooks';
import {
  ordersUserActions,
  ordersUserSelector
} from '../../services/slice/ordersUser/ordersUserSlice';

export const ProfileOrders: FC = () => {
  const { fetchUserOrders } = useActionCreators(ordersUserActions);
  const orders = useSelector(ordersUserSelector.getOrders);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      fetchUserOrders();
    }
  }, [orders, fetchUserOrders]);

  return <ProfileOrdersUI orders={orders} />;
};
