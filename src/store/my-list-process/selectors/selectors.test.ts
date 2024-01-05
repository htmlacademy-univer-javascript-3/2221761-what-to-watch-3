import {describe, expect} from 'vitest';
import {NameSpace} from '../../../const.ts';
import {makeFakePreviewFilms} from '../../../utils';
import {getFavoriteFilmCount, getFavoriteFilms, getFavoriteFilmsDataLoading} from './selectors.ts';

describe('MyList selector', () => {
  const stateFavoriteFilms = makeFakePreviewFilms();

  const state = {
    [NameSpace.MyList]: {
      favoriteFilms: stateFavoriteFilms,
      favoriteFilmCount: stateFavoriteFilms.length,
      isFavoriteFilmsLoading: true,
    }
  };

  it('should return "favoriteFilms" from state', () => {
    const {favoriteFilms} = state[NameSpace.MyList];
    const result = getFavoriteFilms(state);
    expect(result).toBe(favoriteFilms);
  });

  it('should return "isFavoriteFilmsLoading" from state', () => {
    const {isFavoriteFilmsLoading} = state[NameSpace.MyList];
    const result = getFavoriteFilmsDataLoading(state);
    expect(result).toBe(isFavoriteFilmsLoading);
  });

  it('should return "favoriteFilmCount" from state', () => {
    const {favoriteFilmCount} = state[NameSpace.MyList];
    const result = getFavoriteFilmCount(state);
    expect(result).toBe(favoriteFilmCount);
  });
});
