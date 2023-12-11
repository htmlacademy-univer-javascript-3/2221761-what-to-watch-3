import {PreviewTypes} from '../models';
import {DEFAULT_GENRES} from '../const.ts';

export const getGenreList = (films: PreviewTypes[]) => {
  const genreSet = new Set(films.map((film) => film.genre));
  const genreList = Array.from(genreSet);
  genreList.sort();
  genreList.unshift(DEFAULT_GENRES);
  return genreList;
};
