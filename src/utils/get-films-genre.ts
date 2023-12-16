import {DEFAULT_GENRE} from '../const.ts';
import {PreviewTypes} from '../models';

export const getFilmsByGenre = (films: PreviewTypes[], genre: string) => genre === DEFAULT_GENRE ? films : films.filter((film) => film.genre === genre);
