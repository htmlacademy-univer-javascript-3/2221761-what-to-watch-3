import {createAsyncThunk} from '@reduxjs/toolkit';
import {PreviewFilm} from '../../../types/preview-film.ts';
import {AppDispatch, State} from '../../../types/state.ts';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../../../const.ts';
import {FavoriteFilmPostData} from '../../../types/favorite-film-post-data.ts';
import {FilmFavoriteStatus} from '../../../types/film-favorite-status.ts';

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
