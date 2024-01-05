import {describe, expect} from 'vitest';
import {
  getCurrentFilm,
  getCurrentSimilarFilms, getFilmDataLoading,
  getFilms,
  getFilmsDataLoading,
  getPromoFilm,
  getPromoFilmLoading, getSimilarFilmsLoading
} from './selectors.ts';
import {NameSpace} from '../../../const.ts';
import {makeFakeFilm, makeFakePreviewFilms, makeFakePromoFilm} from '../../../utils';

describe('FilmData selectors', () => {
  const state = {
    [NameSpace.Film]: {
      films: makeFakePreviewFilms(),
      isFilmsDataLoading: true,
      currentFilm: makeFakeFilm(),
      isFilmDataLoading: true,
      promoFilm: makeFakePromoFilm(),
      isPromoFilmLoading: true,
      currentSimilarFilms: makeFakePreviewFilms(),
      isSimilarFilmsLoading: false,
    }
  };

  describe('films', () => {
    it ('should return "films" from state', () => {
      const {films} = state[NameSpace.Film];
      const result = getFilms(state);
      expect(result).toBe(films);
    });

    it('should return "isFilmLoading" from state', () => {
      const {isFilmsDataLoading} = state[NameSpace.Film];
      const result = getFilmsDataLoading(state);
      expect(result).toBe(isFilmsDataLoading);
    });
  });

  describe('film', () => {
    it ('should return "film" from state', () => {
      const {currentFilm} = state[NameSpace.Film];
      const result = getCurrentFilm(state);
      expect(result).toBe(currentFilm);
    });

    it('should return "getFilmDataLoading" from state', () => {
      const {isFilmDataLoading} = state[NameSpace.Film];
      const result = getFilmDataLoading(state);
      expect(result).toBe(isFilmDataLoading);
    });
  });

  describe('currentSimilarFilms', () => {
    it('should currentSimilarFilms from state', () => {
      const {currentSimilarFilms} = state[NameSpace.Film];
      const result = getCurrentSimilarFilms(state);
      expect(result).toBe(currentSimilarFilms);
    });

    it('should "getSimilarFilmsLoading" from state', () => {
      const {isSimilarFilmsLoading} = state[NameSpace.Film];
      const result = getSimilarFilmsLoading(state);
      expect(result).toBe(isSimilarFilmsLoading);
    });
  });

  describe('promoFilm', () => {
    it('should return promoFilm from state', () => {
      const {promoFilm} = state[NameSpace.Film];
      const result = getPromoFilm(state);
      expect(result).toBe(promoFilm);
    });

    it('should return "getPromoFilmLoading" from state', () => {
      const {isPromoFilmLoading} = state[NameSpace.Film];
      const result = getPromoFilmLoading(state);
      expect(result).toBe(isPromoFilmLoading);
    });
  });
});
