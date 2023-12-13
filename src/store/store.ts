import {combineReducers, configureStore} from '@reduxjs/toolkit';
import genreReducer from './reducer.ts';
import {createApi} from '../services/api.ts';

const api = createApi();

const rootReducer = combineReducers({
  genreReducer
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
