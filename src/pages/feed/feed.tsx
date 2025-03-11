import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useActionCreators } from '../../services/hooks/hooks';
import { feedActions, feedSelectors } from '../../services/slice/feeds/feed';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/thunk/ingredients';
import { RequestStatus } from '@utils-types';
import { orderSliceSelectors } from '../../services/slice/order/orderSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { fetchOrders } = useActionCreators(feedActions);
  const orders = useSelector(feedSelectors.getOrders);
  const requestStatus = useSelector(orderSliceSelectors.getOrderStatus);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchIngredients());
      fetchOrders();
    }
  }, [orders.length, dispatch, fetchOrders]);

  const handleGetFeeds = useCallback(
    async (e?: SyntheticEvent) => {
      e?.preventDefault();

      setIsFetching(true);

      try {
        await fetchOrders();
      } finally {
        setIsFetching(false);
      }
    },
    [fetchOrders]
  );

  if (requestStatus === RequestStatus.Loading || isFetching) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
