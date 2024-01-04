import {createAsyncThunk} from '@reduxjs/toolkit';
import {PreviewFilm} from '../../../types/preview-film.ts';
import {AppDispatch, State} from '../../../types/state.ts';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../../../const.ts';
import {Film} from '../../../types/film.ts';
import {PromoFilm} from '../../../types/promo-film.ts';

export const fetchFilmsAction = createAsyncThunk<PreviewFilm[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PreviewFilm[]>(APIRoute.Films);
    return data;
  },
);

export const fetchFilmAction = createAsyncThunk<Film, {filmId: string}, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async ({filmId}, {extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    return data;
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<PreviewFilm[], {filmId: string}, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async ({filmId}, {extra: api}) => {
    const {data} = await api.get<PreviewFilm[]>(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  },
);

export const fetchPromoFilmAction = createAsyncThunk<PromoFilm, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(`${APIRoute.PromoFilm}`);
    return data;
  },
);
