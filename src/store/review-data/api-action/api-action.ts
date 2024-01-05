import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../../../const.ts';
import {AppDispatch, Review} from '../../../types';

export const fetchFilmReviewsAction = createAsyncThunk<Review[], {filmId: string}, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilmReviews',
  async ({filmId}, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${filmId}`);
    return data;
  },
);

