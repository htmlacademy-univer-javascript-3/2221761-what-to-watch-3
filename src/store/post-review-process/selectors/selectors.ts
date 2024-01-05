import {State} from '../../../types';
import {NameSpace} from '../../../const.ts';

export const getFormReviewSubmitting = (state: Pick<State, NameSpace.PostingReview >): boolean => state[NameSpace.PostingReview].isFormReviewSubmitting;
