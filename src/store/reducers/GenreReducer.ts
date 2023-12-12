import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {films} from '../../mocks/films.ts';
import {DEFAULT_GENRES} from '../../const.ts';
import {PreviewTypes} from '../../models';

type genreState = {
  genre: string;
  films: PreviewTypes[];
}

const initialState: genreState = {
  genre: DEFAULT_GENRES,
  films: films,
};

const genreReducer = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<{ genre: string }>) => {
      state.genre = action.payload.genre;
    },
  },
});

export const {changeGenre} = genreReducer.actions;

export default genreReducer.reducer;
