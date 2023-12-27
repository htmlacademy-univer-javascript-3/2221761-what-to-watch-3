import {describe} from 'vitest';
import {MyFilmProcess} from '../../types/state.ts';
import {myListProcess} from './my-list-process.ts';

describe('', () => {
  const initialState: MyFilmProcess = {
    favoriteFilms: [],
    favoriteFilmCount: 0,
    isFavoriteFilmsLoading: false,
  };

  it ('', () => {
    const expectedState = {...initialState};
    const emptyAction = {type: ''};
    const result = myListProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
});
