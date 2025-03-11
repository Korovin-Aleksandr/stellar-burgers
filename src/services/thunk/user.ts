import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../hooks/hooks';

import { USER_SLICE_NAME } from '../slice/name';
import { setCookie } from '../../utils/cookie';

export const registerUser = createAppAsyncThunk<TAuthResponse, TRegisterData>(
  `${USER_SLICE_NAME}/registerUser`,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

export const fetchUser = createAppAsyncThunk<TUserResponse, void>(
  `${USER_SLICE_NAME}/checkUserAuth`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAppAsyncThunk<TAuthResponse, TLoginData>(
  `${USER_SLICE_NAME}/loginUser`,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка входа');
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; Max-Age=0; path=/';
    } catch (error) {
      return rejectWithValue('Ошибка выхода');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAppAsyncThunk<void, { email: string }>(
  `${USER_SLICE_NAME}/forgotPassword`,
  async (data, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка запроса на восстановление пароля'
      );
    }
  }
);

export const resetPassword = createAppAsyncThunk<
  void,
  { password: string; token: string }
>(`${USER_SLICE_NAME}/resetPassword`, async (data, { rejectWithValue }) => {
  try {
    await resetPasswordApi(data);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка смены пароля');
  }
});
