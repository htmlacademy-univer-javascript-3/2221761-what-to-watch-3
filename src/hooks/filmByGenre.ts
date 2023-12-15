import {useTypedSelector} from './redux.ts';
import {getFilmsByGenre} from '../utils/get-films-genre.ts';

export const useFilmsByGenre = (genre: string) => useTypedSelector((state) => getFilmsByGenre(state.films , genre));
