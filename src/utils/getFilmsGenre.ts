import {DEFAULT_GENRES} from '../const.ts';
import {PreviewTypes} from '../models';

export const getFilmsByGenre = (films: PreviewTypes[], genre: string) => genre === DEFAULT_GENRES ? films : films.filter((film) => film.genre === genre);
