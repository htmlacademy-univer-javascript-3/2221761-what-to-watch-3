import { DEFAULT_GENRE } from '../const';
import { PreviewFilm } from '../types/preview-film';

export const getGenreList = (films: PreviewFilm[]) => {
  const genreSet: Set<string> = new Set([DEFAULT_GENRE]);
  films.forEach((film) => {
    genreSet.add(film.genre);
  });
  return Array.from(genreSet).sort();
};
