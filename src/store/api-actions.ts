import {loadFilms, loadingStatus, redirectToRoute, requireAuthorization} from './actions.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AuthData, FilmsTypes, UserData} from '../models';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {AppDispatch, State} from './store.ts';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
  state: State;
  dispatch: AppDispatch;
}>(
  'data/films',
  async (_arg, {dispatch, extra: $api}) => {
    dispatch(loadingStatus(true));
    const {data} = await $api.get<FilmsTypes[]>(APIRoute.Films);
    dispatch(loadingStatus(false));
    dispatch(loadFilms(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
  state: State;
  dispatch: AppDispatch;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: $api}) => {
    try {
      await $api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (e) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  extra: AxiosInstance;
  state: State;
  dispatch: AppDispatch;
}>(
  'user/login',
  async({login: email, password}, {dispatch, extra: $api}) => {
    const {data: {token}} = await $api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
  state: State;
  dispatch: AppDispatch;
}>(
  'user/logout',
  async(_arg, {dispatch, extra: $api}) => {
    await $api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);
