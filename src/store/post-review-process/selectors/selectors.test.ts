import {NameSpace} from '../../../const.ts';
import {getFormReviewSubmitting} from './selectors.ts';

describe('PostingReviewProcess selectors', () => {
  const state = {
    [NameSpace.PostingReview]: {
      isFormReviewSubmitting: false
    }
  };

  it('return "isFormReviewSubmitting" from state', () => {
    const { isFormReviewSubmitting } = state[NameSpace.PostingReview];

    const result = getFormReviewSubmitting(state);

    expect(result).toBe(isFormReviewSubmitting);
  });
});
