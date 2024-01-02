import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../types/state.ts';
import { AxiosInstance } from 'axios';
import {APIRoute, AppRoute} from '../../../const.ts';
import { ReviewAddingData } from '../../../types/review-adding-data.ts';
import {redirectToRoute} from '../../action.ts';
import {toast} from 'react-toastify';

export const postReview = createAsyncThunk<
  void,
  ReviewAddingData,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('review/post', async ({ id: filmId, comment, rating }, {dispatch, extra: api }) => {
  await api.post<ReviewAddingData>(`${APIRoute.Comments}/${filmId}`, { comment, rating });
  dispatch(redirectToRoute(`${AppRoute.FilmData}/${filmId}`));
  toast('Комментарий успешно отправлен');
});
