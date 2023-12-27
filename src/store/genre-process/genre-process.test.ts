import {describe} from 'vitest';
import {changeActiveGenre, genreProcess} from './genre-process.ts';
import {DEFAULT_GENRE} from '../../const.ts';

describe('GenreProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const expectedState = {genre: 'Horror'};
    const emptyAction = {type: ''};
    const result = genreProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const expectedState = {genre: DEFAULT_GENRE};
    const emptyAction = {type: ''};
    const result = genreProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('change genre "changeActiveGenre" action', () => {
    const initialState = {genre: DEFAULT_GENRE};
    const expectedState = 'Horror';
    const result = genreProcess.reducer(initialState, changeActiveGenre(expectedState));
    expect(result.genre).toBe(expectedState);
  });
});
