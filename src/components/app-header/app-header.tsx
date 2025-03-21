import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelector } from '../../services/slice/user/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelector.getUserName);
  return <AppHeaderUI userName={userName} />;
};
