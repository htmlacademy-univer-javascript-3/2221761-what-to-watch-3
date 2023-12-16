import {createAction} from '@reduxjs/toolkit';
import {FilmsTypes, PreviewTypes, ReviewsTypes} from '../models';
import {AuthorizationStatus} from '../const.ts';

export const changeActiveGenre = createAction<{ genre: string }>('app/changeActiveGenre');

export const loadFilms = createAction<PreviewTypes[]>('data/loadFilms');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

export const setFilmDataLoadingStatus = createAction<boolean>('data/setFilmDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<string>('app/redirectToRoute');

export const loadFilm = createAction<FilmsTypes>('data/loadFilm');

export const setSimilarFilmsDataLoadingStatus = createAction<boolean>('data/setSimilarFilmsDataLoadingStatus');

export const loadSimilarFilms = createAction<PreviewTypes[]>('data/loadSimilarFilms');

export const loadFilmReviews = createAction<ReviewsTypes[]>('data/loadFilmReviews');

