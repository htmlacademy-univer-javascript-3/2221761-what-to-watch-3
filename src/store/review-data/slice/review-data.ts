import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const.ts';
import { ReviewData } from '../../../types';
import {fetchFilmReviewsAction} from '../api-action/api-action.ts';

const initialState: ReviewData = {
  currentFilmReviews: [],
  isFilmReviewsLoading: false,
};

export const reviewData = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmReviewsAction.pending, (state) => {
        state.isFilmReviewsLoading = true;
      })
      .addCase(fetchFilmReviewsAction.fulfilled, (state, action) => {
        state.currentFilmReviews = action.payload;
        state.isFilmReviewsLoading = false;
      });
  }
});
