import {createAPI} from '../services/api.ts';
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer.ts';
import {redirect} from './middleware/redirect.ts';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
