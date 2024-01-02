import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const.ts';
import {postReview} from '../api-action/api-action.ts';
import {PostingReviewProcess} from '../../../types/state.ts';

const initialState: PostingReviewProcess = {
  isFormReviewSubmitting: false,
};

export const postingReviewProcess = createSlice({
  name: NameSpace.PostingReview,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postReview.pending, (state) => {
        state.isFormReviewSubmitting = true;
      })
      .addCase(postReview.fulfilled, (state) => {
        state.isFormReviewSubmitting = false;
      })
      .addCase(postReview.rejected, (state) => {
        state.isFormReviewSubmitting = false;
      });
  }
});
