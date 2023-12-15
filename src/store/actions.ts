import {createAction} from '@reduxjs/toolkit';
import {PreviewTypes} from '../models';
import {AuthorizationStatus} from '../const.ts';

export const changeGenre = createAction<{ genre: string }>('app/changeGenre');
export const loadFilms = createAction<PreviewTypes[]>('data/loadFilm');
export const loadingStatus = createAction<boolean>('data/loadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<string>('app/redirectToRoute');
