import {AuthorizationStatus, DEFAULT_GENRES} from '../const.ts';
import {PreviewTypes} from '../models';
import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, loadFilms, loadingStatus, requireAuthorization} from './actions.ts';

type InitialState = {
  genre: string;
  films: PreviewTypes[];
  filmLoading: boolean;
  authStatus: string;
}

const initialState: InitialState = {
  genre: DEFAULT_GENRES,
  films: [],
  filmLoading: false,
  authStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadingStatus, (state, action) => {
      state.filmLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    });
});
