import { Dispatch, useMemo } from 'react';
import {
  Action,
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { getJSDocReturnType } from 'typescript';
import { AppDispatch, RootState } from '../store';
import { useDispatch } from 'react-redux';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  extra: any;
  dispatch: AppDispatch;
  state: RootState;
}>();

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (
  ...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>;

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
