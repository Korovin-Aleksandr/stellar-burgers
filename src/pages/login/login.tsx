import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useActionCreators } from '../../services/hooks/hooks';
import { userActions } from '../../services/slice/user/userSlice';

export const Login: FC = () => {
  const { loginUser } = useActionCreators(userActions);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
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
