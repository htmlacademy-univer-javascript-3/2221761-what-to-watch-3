import { NameSpace } from '../../../const.ts';
import {Review, State} from '../../../types';

export const getCurrentFilmReviews = (state: Pick<State, NameSpace.Review>): Review[] => state[NameSpace.Review].currentFilmReviews;
export const getFilmReviewsLoading = (state: Pick<State, NameSpace.Review>): boolean => state[NameSpace.Review].isFilmReviewsLoading;

