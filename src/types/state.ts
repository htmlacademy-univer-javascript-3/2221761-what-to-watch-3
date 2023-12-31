import { AuthorizationStatus } from '../const';
import { store } from '../store/store.ts';
import { Film } from './film';
import { PreviewFilm } from './preview-film';
import { PromoFilm } from './promo-film';
import { Review } from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  avatarUrl: string;
};

export type FilmData = {
  films: PreviewFilm[];
  isFilmsDataLoading: boolean;
  currentFilm?: Film;
  isFilmDataLoading: boolean;
  promoFilm?: PromoFilm;
  isPromoFilmLoading: boolean;
  currentSimilarFilms: PreviewFilm[];
  isSimilarFilmsLoading: boolean;
}

export type ReviewData = {
  currentFilmReviews: Review[];
  isFilmReviewsLoading: boolean;
}

export type GenreProcess = {
  genre: string;
}

export type MyFilmProcess = {
  favoriteFilms: PreviewFilm[];
  favoriteFilmCount: number;
  isFavoriteFilmsLoading: boolean;
}

export type PostingReviewProcess = {
  isFormReviewSubmitting: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
