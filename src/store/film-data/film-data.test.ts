import {describe, expect} from 'vitest';
import {filmData} from './film-data.ts';
import {fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction} from '../api-actions.ts';
import {makeFakeFilm, makeFakePreviewFilms, makeFakePromoFilm} from '../../utils/mocks.ts';
import {FilmData} from '../../types/state.ts';

describe('FilmData slice', () => {
  const initialState: FilmData = {
    films: [],
    isFilmsDataLoading: false,
    currentFilm: undefined,
    isFilmDataLoading: false,
    promoFilm: undefined,
    isPromoFilmLoading: false,
    currentSimilarFilms: [],
    isSimilarFilmsLoading: false,
  };

  describe('should return initial state', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = {type: ''};
      const expectedState = {...initialState};
      const result = filmData.reducer(expectedState, emptyAction);
      expect(result).toEqual(expectedState);
    });

    it('with empty action and undefined state', () => {
      const expectedState = {...initialState};
      const emptyAction = {type: ''};
      const result = filmData.reducer(undefined, emptyAction);
      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchFilmsAction', () => {
    it('set "true" on "isFilmsLoading" with "fetchFilmsAction.pending" action', () => {
      const expectedState = {...initialState, isFilmsDataLoading: true};
      const result = filmData.reducer(expectedState, fetchFilmsAction.pending);
      expect(result).toEqual(expectedState);
    });

    it('set "false" on "isFilmsLoading" and payload on "films" with "fetchFilmsAction.fulfilled" action', () => {
      const films = makeFakePreviewFilms();
      const expectedState = { ...initialState, isFilmsDataLoading: false, films: films };
      const result = filmData.reducer(initialState, fetchFilmsAction.fulfilled(films, '', undefined));
      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchFilmAction', () => {
    it('set "true" on "isCurrentSimilarFilmsLoading" with "fetchSimilarFilmsAction.pending" action', () => {
      const expectedState = {...initialState, isFilmDataLoading: true};
      const result = filmData.reducer(expectedState, fetchFilmAction.pending);
      expect(result).toEqual(expectedState);
    });

    it('set "false" on "isCurrentFilmLoading" and payload on "currentFilm" with "fetchFilmAction.fulfilled" action', () => {
      const film = makeFakeFilm();
      const expectedState = {...initialState, isFilmDataLoading: false, currentFilm: film};
      const result = filmData.reducer(initialState, fetchFilmAction.fulfilled(film, '', {filmId: ''}));
      expect(result).toEqual(expectedState);
    });
  });

  describe('', () => {
    it('', () => {
      const expectedState = {...initialState, isSimilarFilmsLoading: true};
      const result = filmData.reducer(initialState, fetchSimilarFilmsAction.pending);
      expect(result).toEqual(expectedState);
    });

    it('', () => {
      const films = makeFakePreviewFilms();
      const expectedState = {...initialState, isSimilarFilmsLoading: false, currentSimilarFilms: films};
      const result = filmData.reducer(initialState, fetchSimilarFilmsAction.fulfilled(films, '', {filmId: ''}));
      expect(result).toEqual(expectedState);
    });
  });

  describe('', () => {
    it('', () => {
      const expectedState = {...initialState, isPromoFilmLoading: true};
      const result = filmData.reducer(initialState, fetchPromoFilmAction.pending);
      expect(result).toEqual(expectedState);
    });

    it('', () => {
      const promoFilm = makeFakePromoFilm();
      const expectedState = {...initialState, isPromoFilmLoading: false, promoFilm: promoFilm};
      const result = filmData.reducer(initialState, fetchPromoFilmAction.fulfilled(promoFilm, '', undefined));
      expect(result).toEqual(expectedState);
    });
  });
});
