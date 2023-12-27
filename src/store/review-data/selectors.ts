import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getCurrentFilmReviews = (state: Pick<State, NameSpace.Review>): Review[] => state[NameSpace.Review].currentFilmReviews;
export const getFilmReviewsLoading = (state: Pick<State, NameSpace.Review>): boolean => state[NameSpace.Review].isFilmReviewsLoading;

