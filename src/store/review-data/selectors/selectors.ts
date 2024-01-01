import { NameSpace } from '../../../const.ts';
import { Review } from '../../../types/review.ts';
import { State } from '../../../types/state.ts';

export const getCurrentFilmReviews = (state: Pick<State, NameSpace.Review>): Review[] => state[NameSpace.Review].currentFilmReviews;
export const getFilmReviewsLoading = (state: Pick<State, NameSpace.Review>): boolean => state[NameSpace.Review].isFilmReviewsLoading;

