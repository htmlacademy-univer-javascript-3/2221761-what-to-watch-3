import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { ReviewAddingData } from '../types/review-adding-data';

export const postReview = createAsyncThunk<
  void,
  ReviewAddingData,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('review/post', async ({ id: filmId, comment, rating }, { extra: api }) => {
  await api.post<ReviewAddingData>(`${APIRoute.Comments}/${filmId}`, { comment, rating });
});
