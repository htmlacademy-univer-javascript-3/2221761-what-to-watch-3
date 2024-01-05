import { NameSpace } from '../../../const.ts';
import {PreviewFilm, State} from '../../../types';

export const getFavoriteFilms = (state: Pick<State, NameSpace.MyList>): PreviewFilm[] => state[NameSpace.MyList].favoriteFilms;
export const getFavoriteFilmsDataLoading = (state: Pick<State, NameSpace.MyList>): boolean => state[NameSpace.MyList].isFavoriteFilmsLoading;
export const getFavoriteFilmCount = (state: Pick<State, NameSpace.MyList>): number => state[NameSpace.MyList].favoriteFilmCount;
