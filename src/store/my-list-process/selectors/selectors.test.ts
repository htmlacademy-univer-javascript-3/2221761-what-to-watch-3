import {describe, expect} from 'vitest';
import {NameSpace} from '../../../const.ts';
import {makeFakePreviewFilms} from '../../../utils';
import {getFavoriteFilmCount, getFavoriteFilms, getFavoriteFilmsDataLoading} from './selectors.ts';

describe('', () => {
  const stateFavoriteFilms = makeFakePreviewFilms();

  const state = {
    [NameSpace.MyList]: {
      favoriteFilms: stateFavoriteFilms,
      favoriteFilmCount: stateFavoriteFilms.length,
      isFavoriteFilmsLoading: true,
    }
  };

  it('', () => {
    const {favoriteFilms} = state[NameSpace.MyList];
    const result = getFavoriteFilms(state);
    expect(result).toBe(favoriteFilms);
  });

  it('', () => {
    const {isFavoriteFilmsLoading} = state[NameSpace.MyList];
    const result = getFavoriteFilmsDataLoading(state);
    expect(result).toBe(isFavoriteFilmsLoading);
  });

  it('', () => {
    const {favoriteFilmCount} = state[NameSpace.MyList];
    const result = getFavoriteFilmCount(state);
    expect(result).toBe(favoriteFilmCount);
  });
});
