import {beforeEach, describe, expect} from 'vitest';
import {createAPI} from '../../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../../types/state.ts';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, makeFakeFilmId, makeFakeReview} from '../../../utils/mocks.ts';
import {APIRoute, NameSpace} from '../../../const.ts';
import {fetchFilmReviewsAction} from './api-action.ts';

describe('Async Action', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleWare = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleWare);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Review]: {
        currentFilmReviews: [],
        isFilmReviewsLoading: false,
      }
    });
  });

  describe('fetchFilmReviewsAction', () => {
    it('should dispatch "fetchFilmReviewsAction.pending" and "fetchFilmReviewsAction.fulfilled when server response 200"', async () => {
      const mockFilmId = makeFakeFilmId();
      const mockFilmReviews = [makeFakeReview()];

      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockFilmId}`).reply(200, mockFilmReviews);
      await store.dispatch(fetchFilmReviewsAction({filmId: mockFilmId}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilmReviewsAction.pending.type,
        fetchFilmReviewsAction.fulfilled.type,
      ]);

      expect(fetchFilmReviewsActionFulfilled.payload).toEqual(mockFilmReviews);
    });

    it('should dispatch "fetchFilmReviewsAction.pending" and "fetchFilmReviewsAction.rejected" when server response 404', async () => {
      const mockFilmId = makeFakeFilmId();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockFilmId}`).reply(404);
      await store.dispatch(fetchFilmReviewsAction({filmId: mockFilmId}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFilmReviewsAction.pending.type,
        fetchFilmReviewsAction.rejected.type,
      ]);
    });
  });
});
