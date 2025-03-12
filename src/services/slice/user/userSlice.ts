import { createSlice } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../name';
import { RequestStatus, TUser } from '@utils-types';
import {
  fetchUser,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser
} from '../../thunk/user';

export interface UserState {
  data: TUser | null;
  requestStatus: RequestStatus;
  userCheck: boolean;
}

const initialState: UserState = {
  data: null,
  requestStatus: RequestStatus.Idle,
  userCheck: false
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setUserCheck: (state) => {
      state.userCheck = true;
    }
  },
  selectors: {
    selectUser: (state) => state.data,
    selectUserCheck: (state) => state.userCheck,
    getUserName: (state) => state.data?.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload.user;
        state.userCheck = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.userCheck = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload.user;
        state.userCheck = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload.user;
        state.userCheck = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logoutUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(resetPassword.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const userActions = {
  ...userSlice.actions,
  fetchUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser
};

export const userSelector = userSlice.selectors;
export default userSlice;
