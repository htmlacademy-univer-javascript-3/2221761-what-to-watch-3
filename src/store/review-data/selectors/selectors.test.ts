import {describe, expect} from 'vitest';
import {NameSpace} from '../../../const.ts';
import {makeFakeReview} from '../../../utils/mocks.ts';
import {getCurrentFilmReviews, getFilmReviewsLoading} from './selectors.ts';

describe('Review', () => {
  const state = {
    [NameSpace.Review] : {
      currentFilmReviews: [makeFakeReview()],
      isFilmReviewsLoading: true,
    }
  };

  it('should return "currentFilmReviews" from state', () => {
    const {currentFilmReviews} = state[NameSpace.Review];
    const result = getCurrentFilmReviews(state);
    expect(result).toBe(currentFilmReviews);
  });

  it('should return "isFilmReviewsLoading" from state', () => {
    const {isFilmReviewsLoading} = state[NameSpace.Review];
    const result = getFilmReviewsLoading(state);
    expect(result).toBe(isFilmReviewsLoading);
  });
});

