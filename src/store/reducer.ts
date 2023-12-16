import { createReducer } from '@reduxjs/toolkit';
import {AuthorizationStatus, DEFAULT_GENRE} from '../const';
import {FilmsTypes, PreviewTypes, ReviewsTypes} from '../models';
import {
  changeActiveGenre, loadFilm, loadFilmReviews,
  loadFilms, loadSimilarFilms,
  requireAuthorization,
  setFilmDataLoadingStatus,
  setFilmsDataLoadingStatus, setSimilarFilmsDataLoadingStatus
} from './actions.ts';


type InitialState = {
  genre: string;
  films: PreviewTypes[];
  isFilmsDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  currentFilm?: FilmsTypes;
  isFilmDataLoading: boolean;
  currentSimilarFilms?: PreviewTypes[];
  isSimilarFilmsLoading: boolean;
  currentFilmReviews?: ReviewsTypes[];
}

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  films: [],
  isFilmsDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentFilm: undefined,
  isFilmDataLoading: false,
  currentSimilarFilms: [],
  isSimilarFilmsLoading: false,
  currentFilmReviews: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(setFilmDataLoadingStatus, (state, action) => {
      state.isFilmDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(setSimilarFilmsDataLoadingStatus, (state, action) => {
      state.isSimilarFilmsLoading = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.currentSimilarFilms = action.payload;
    })
    .addCase(loadFilmReviews, (state, action) => {
      state.currentFilmReviews = action.payload;
    });
});
