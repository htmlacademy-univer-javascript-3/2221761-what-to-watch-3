import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../../types/state.ts';
import {AxiosInstance} from 'axios';
import {UserData} from '../../../types/user-data.ts';
import {APIRoute, AppRoute} from '../../../const.ts';
import {AuthData} from '../../../types/auth-data.ts';
import {dropToken, saveToken} from '../../../services/token.ts';
import {redirectToRoute} from '../../action.ts';
import {fetchFavoriteFilmsAction} from '../../my-list-process/api-actions/api-actions.ts';
import {clearMyList} from '../../my-list-process/slice/my-list-process.ts';
import {toast} from 'react-toastify';

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
