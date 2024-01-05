import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../../../const.ts';
import {AppDispatch, FavoriteFilmPostData, FilmFavoriteStatus, PreviewFilm, State} from '../../../types';

export const fetchFavoriteFilmsAction = createAsyncThunk<PreviewFilm[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PreviewFilm[]>(APIRoute.FavoriteFilms);
    return data;
  },
);

export const postFilmFavoriteStatus = createAsyncThunk<
  FavoriteFilmPostData,
  FilmFavoriteStatus,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('myList/setFilmFavoriteStatus', async ({ id, status }, { extra: api }) => {
  const { data } = await api.post<FavoriteFilmPostData>(
    `${APIRoute.FavoriteFilms}/${id}/${status}`
  );
  return data;
});
