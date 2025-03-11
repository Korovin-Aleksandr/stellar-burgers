import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useActionCreators } from '../../services/hooks/hooks';
import { userActions } from '../../services/slice/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const { loginUser } = useActionCreators(userActions);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password });

      if ('error' in result) {
        console.error('Ошибка авторизации:', result.error);
        return;
      }

      navigate('/');
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
