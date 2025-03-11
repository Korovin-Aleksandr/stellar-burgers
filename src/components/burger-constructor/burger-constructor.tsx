import { FC, useMemo, useState } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  construcnorAction,
  construcnorSelectors
} from '../../services/slice/burder-constructor/burgerConstructorSlice';
import { useActionCreators } from '../../services/hooks/hooks';
import {
  orderSliceActions,
  orderSliceSelectors
} from '../../services/slice/order/orderSlice';
import { getCookie } from '../../utils/cookie';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  //нужно упростить
  const navigate = useNavigate();
  const location = useLocation();
  const { createOrder } = useActionCreators(orderSliceActions);
  const orderIngredients = useSelector(
    construcnorSelectors.getConstructorIngredients
  );
  const { clearConstructor } = useActionCreators(construcnorAction);
  const bun = orderIngredients.find((item) => item.type === 'bun');
  const ingredients = orderIngredients.filter((item) => item.type !== 'bun');
  const newOrder = useSelector(orderSliceSelectors.getNewOrder);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const { clearOrder } = useActionCreators(orderSliceActions);
  const requestStatus = useSelector(orderSliceSelectors.getOrderStatus);

  const constructorItems = {
    bun,
    ingredients
  };

  const orderRequest = requestStatus === RequestStatus.Loading;

  const orderModalData = isOrderModalOpen ? newOrder : null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    createOrder(ingredientIds);
    setOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
    clearOrder();
    clearConstructor();
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
