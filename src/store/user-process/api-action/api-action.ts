import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute} from '../../../const.ts';
import {dropToken, saveToken} from '../../../services/token.ts';
import {redirectToRoute} from '../../action.ts';
import {toast} from 'react-toastify';
import {AppDispatch, AuthData, State, UserData} from '../../../types';
import {clearMyList, fetchFavoriteFilmsAction} from '../../my-list-process';

export const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const {
      data: { avatarUrl },
    } = await api.get<UserData>(APIRoute.Login);
    return avatarUrl;
  },
);

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: { token, avatarUrl }} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(fetchFavoriteFilmsAction());
    dispatch(redirectToRoute(AppRoute.Main));
    toast('Вход прошел успешно');
    return avatarUrl;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dispatch(clearMyList());
    dropToken();
  },
);
