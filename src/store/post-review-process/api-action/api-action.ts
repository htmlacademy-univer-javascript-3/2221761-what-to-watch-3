import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {APIRoute, AppRoute} from '../../../const.ts';
import {redirectToRoute} from '../../action.ts';
import {toast} from 'react-toastify';
import {AppDispatch, ReviewAddingData} from '../../../types';

export const postReview = createAsyncThunk<
  void,
  ReviewAddingData,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('review/post', async ({ id: filmId, comment, rating }, {dispatch, extra: api }) => {
  await api.post<ReviewAddingData>(`${APIRoute.Comments}/${filmId}`, { comment, rating });
  dispatch(redirectToRoute(`${AppRoute.FilmData}/${filmId}`));
  toast('Комментарий успешно отправлен');
});
