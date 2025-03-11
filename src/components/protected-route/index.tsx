import { Preloader } from '@ui';
import { userSelector } from '../../services/slice/user/userSlice';
import { useAppSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  isPublic?: boolean;
};

function ProtectedRoute({ children, isPublic }: ProtectedRouteProps) {
  const user = useAppSelector(userSelector.selectUser);
  const userCheck = useAppSelector(userSelector.selectUserCheck);

  //не понимаю, как это реализовать
  // if (!userCheck) {
  //   return <Preloader />;
  // }

  if (isPublic && user) {
    return <Navigate to='/profile' />;
  }

  if (!isPublic && !user) {
    return <Navigate to='/login' />;
  }
  return children;
}

export default ProtectedRoute;
