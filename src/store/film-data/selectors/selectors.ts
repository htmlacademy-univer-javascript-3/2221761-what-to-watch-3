import { NameSpace } from '../../../const.ts';
import { Film } from '../../../types/film.ts';
import { PreviewFilm } from '../../../types/preview-film.ts';
import { PromoFilm } from '../../../types/promo-film.ts';
import { State } from '../../../types/state.ts';

export const getFilms = (state: Pick<State, NameSpace.Film>): PreviewFilm[] => state[NameSpace.Film].films;
export const getFilmsDataLoading = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isFilmsDataLoading;

export const getCurrentFilm = (state: Pick<State, NameSpace.Film>): Film | undefined => state[NameSpace.Film].currentFilm;
export const getFilmDataLoading = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isFilmDataLoading;

export const getCurrentSimilarFilms = (state: Pick<State, NameSpace.Film>): PreviewFilm[] => state[NameSpace.Film].currentSimilarFilms;
export const getSimilarFilmsLoading = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isSimilarFilmsLoading;

export const getPromoFilm = (state: Pick<State, NameSpace.Film>): PromoFilm | undefined => state[NameSpace.Film].promoFilm;
export const getPromoFilmLoading = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isPromoFilmLoading;
