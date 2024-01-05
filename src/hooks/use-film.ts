import { useAppSelector } from '.';
import {getFilmsByGenre} from '../utils/get-films-by-genre/get-films-by-genre.ts';
import {getFilms} from '../store/film-data/selectors/selectors.ts';

export const useFilmsByGenre = (genre: string) => getFilmsByGenre(useAppSelector(getFilms), genre);

