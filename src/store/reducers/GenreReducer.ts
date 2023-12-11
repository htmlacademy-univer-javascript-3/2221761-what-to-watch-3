import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {films} from '../../mocks/films.ts';
import {DEFAULT_GENRES, SHOWN_FILM_COUNT} from '../../const.ts';
import {PreviewTypes} from '../../models';

type genreState = {
  genre: string;
  films: PreviewTypes[];
  filmsByGenre: PreviewTypes[];
  shownFilmCount: number;
}

const initialState: genreState = {
  genre: DEFAULT_GENRES,
  films: films,
  filmsByGenre: films.slice(1, films.length),
  shownFilmCount: SHOWN_FILM_COUNT,
};

const genreReducer = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<{ genre: string }>) => {
      state.genre = action.payload.genre;
    },
    showFilms: (state) => {
      state.filmsByGenre = state.genre === DEFAULT_GENRES ? initialState.filmsByGenre : initialState.filmsByGenre.filter((film) => film.genre === state.genre);
    },
    changeCount: (state) => {
      state.shownFilmCount += SHOWN_FILM_COUNT;
    },
    resetCount: (state) => {
      state.shownFilmCount = SHOWN_FILM_COUNT;
    },
  },
});

export const { changeGenre, showFilms, changeCount, resetCount } = genreReducer.actions;

export default genreReducer.reducer;
