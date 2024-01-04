import {describe, expect} from 'vitest';
import {reviewData} from './review-data.ts';
import {makeFakeReview} from '../../../utils/mocks.ts';
import {fetchFilmReviewsAction} from '../api-action/api-action.ts';

describe('', () => {
  const initialState = {
    currentFilmReviews: [],
    isFilmReviewsLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {...initialState};
    const result = reviewData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {...initialState};
    const result = reviewData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFilmReviewsLoading" on "true" with "fetchFilmReviewsAction.pending" action', () => {
    const expectedState = {...initialState, isFilmReviewsLoading: true};
    const result = reviewData.reducer(expectedState, fetchFilmReviewsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set payload on "currentFilmReviews" with "fetchFilmReviewsAction.fulfilled" action', () => {
    const reviews = [makeFakeReview()];
    const expectedState = {...initialState, currentFilmReviews: reviews};
    const result = reviewData.reducer(expectedState, fetchFilmReviewsAction.fulfilled(reviews, '', {filmId: ''}));
    expect(result).toEqual(expectedState);
  });
});
