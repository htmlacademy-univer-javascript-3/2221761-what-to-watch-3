import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/slice/user-process.ts';
import { filmData } from './film-data/slice/film-data.ts';
import { genreProcess } from './genre-process/slice/genre-process.ts';
import { reviewData } from './review-data/slice/review-data.ts';
import { myListProcess } from './my-list-process/slice/my-list-process.ts';

export const rootReducer = combineReducers({
  [NameSpace.Genre]: genreProcess.reducer,
  [NameSpace.Film]: filmData.reducer,
  [NameSpace.Review]: reviewData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.MyList]: myListProcess.reducer,
});
