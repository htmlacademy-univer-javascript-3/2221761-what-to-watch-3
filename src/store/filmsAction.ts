import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {FilmsTypes} from '../models';
import { loadFilms, loadingStatus} from './reducer.ts';
import {APIRoute} from '../const.ts';
import {AppDispatch, AppStore} from './store.ts';

export const filmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppStore;
  extra: AxiosInstance;
}>(
  'data/films',
  async (_arg, {dispatch, extra: $api}) => {
    dispatch(loadingStatus(true));
    const {data} = await $api.get<FilmsTypes[]>(APIRoute.Films);
    dispatch(loadingStatus(false));
    dispatch(loadFilms(data));
  }
);
