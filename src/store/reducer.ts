import {DEFAULT_GENRES} from '../const.ts';
import {PreviewTypes} from '../models';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type genreState = {
  genre: string;
  films: PreviewTypes[];
  filmLoading: boolean;
}

const initialState: genreState = {
  genre: DEFAULT_GENRES,
  films: [],
  filmLoading: false,
};

const reducer = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<{ genre: string }>) => {
      state.genre = action.payload.genre;
    },
    loadFilms: (state, action: PayloadAction<PreviewTypes[]>) => {
      state.films = action.payload;
    },
    loadingStatus: (state, action: PayloadAction<boolean>) => {
      state.filmLoading = action.payload;
    }
  },
});

export const {changeGenre, loadFilms, loadingStatus} = reducer.actions;

export default reducer.reducer;
