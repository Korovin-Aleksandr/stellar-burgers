import { Preloader } from '@ui';
import { userSelector } from '../../services/slice/user/userSlice';
import { useAppSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
type ProtectedRouteProps = {
  children: React.ReactNode;
  isPublic?: boolean;
};

function ProtectedRoute({ children, isPublic }: ProtectedRouteProps) {
  const user = useAppSelector(userSelector.selectUser);
  const isAuthChecked = useAppSelector(userSelector.selectUserCheck);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from?.pathname || '/profile';
    return <Navigate to={from} />;
  }

  if (!isPublic && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
