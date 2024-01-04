import {createAsyncThunk} from '@reduxjs/toolkit';
import {Review} from '../../../types/review.ts';
import {AppDispatch} from '../../../types/state.ts';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../../../const.ts';

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

