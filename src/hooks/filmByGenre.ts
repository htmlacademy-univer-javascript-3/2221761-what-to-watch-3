import {useTypedSelector} from './redux.ts';
import {getFilmsByGenre} from '../utils/getFilmsGenre.ts';

export const useFilmsByGenre = (genre: string) => useTypedSelector((state) => getFilmsByGenre(state.genreReducer.films , genre));

