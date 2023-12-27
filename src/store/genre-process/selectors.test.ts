import {describe} from 'vitest';
import {getActiveGenre} from './selectors.ts';
import {NameSpace} from '../../const.ts';

describe('GenreProcess selectors', () => {
  it ('should return genre of state', () => {
    const state = {
      [NameSpace.Genre]: {
        genre: 'Horror'
      }
    };
    const result = getActiveGenre(state);

    expect(result).toBe('Horror');
  });
});
