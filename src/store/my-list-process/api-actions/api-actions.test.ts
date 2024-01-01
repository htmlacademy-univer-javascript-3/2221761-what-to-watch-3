import {beforeEach, describe, expect} from 'vitest';
import {createAPI} from '../../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../../types/state.ts';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, makeFakePreviewFilms} from '../../../utils/mocks.ts';
import {APIRoute, NameSpace} from '../../../const.ts';
import {fetchFavoriteFilmsAction} from './api-actions.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleWare = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleWare);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.MyList]: {
        favoriteFilms: [],
        favoriteFilmCount: 0,
        isFavoriteFilmsLoading: false,
      }
    });
  });

  describe('fetchFavoriteFilmsAction', () => {
    it('should dispatch "fetchFavoriteFilmsAction.pending" and "fetchFavoriteFilmsAction.fulfilled when server response 200"', async () => {
      const mockPreviewsFilms = makeFakePreviewFilms();

      mockAxiosAdapter.onGet(APIRoute.FavoriteFilms).reply(200, mockPreviewsFilms);
      await store.dispatch(fetchFavoriteFilmsAction());

      const emittedState = store.getActions();
      const extractedTypesAction = extractActionsTypes(emittedState);
      const fetchFavoriteFilmsActionFulfilled = emittedState.at(1) as ReturnType<typeof fetchFavoriteFilmsAction.fulfilled>;

      expect(extractedTypesAction).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type,
      ]);

      expect(fetchFavoriteFilmsActionFulfilled.payload).toEqual(mockPreviewsFilms);
    });

    it('should dispatch "fetchFavoriteFilmsAction.pending" and "fetchFavoriteFilmsAction.fulfilled" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.FavoriteFilms).reply(401);
      await store.dispatch(fetchFavoriteFilmsAction());

      const emittedState = store.getActions();
      const extractedTypesAction = extractActionsTypes(emittedState);

      expect(extractedTypesAction).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.rejected.type,
      ]);
    });
  });
});
