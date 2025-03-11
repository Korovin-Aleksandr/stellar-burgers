import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useActionCreators } from '../../services/hooks/hooks';
import { userActions } from '../../services/slice/user/userSlice';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logoutUser } = useActionCreators(userActions);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
