import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useActionCreators } from '../../services/hooks/hooks';
import { userActions, userSelector } from '../../services/slice/user/userSlice';
import { useAppSelector } from '../../services/store';

export const Profile: FC = () => {
  const { updateUser } = useActionCreators(userActions);

  const user = useAppSelector(userSelector.selectUser);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name.trim() !== (user?.name || '').trim() ||
    formValue.email.trim() !== (user?.email || '').trim();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      await updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      }).unwrap();
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
