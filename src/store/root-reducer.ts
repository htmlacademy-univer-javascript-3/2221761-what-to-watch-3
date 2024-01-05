import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import {filmData} from './film-data';
import {reviewData} from './review-data';
import {userProcess} from './user-process';
import {myListProcess} from './my-list-process';
import {postingReviewProcess} from './post-review-process';
import {genreProcess} from './genre-process';

export const rootReducer = combineReducers({
  [NameSpace.Genre]: genreProcess.reducer,
  [NameSpace.Film]: filmData.reducer,
  [NameSpace.Review]: reviewData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.MyList]: myListProcess.reducer,
  [NameSpace.PostingReview]: postingReviewProcess.reducer,
});
