import {beforeEach, describe, expect} from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeFilm,
  makeFakeFilmId,
  makeFakePreviewFilms, makeFakePromoFilm
} from '../../../utils/mocks.ts';
import {APIRoute, NameSpace} from '../../../const.ts';
import {State} from '../../../types/state.ts';
import {createAPI} from '../../../services/api.ts';
import {fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction} from './api-actions.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleWare = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleWare);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Film]: {
        films: [],
        isFilmsDataLoading: false,
        currentFilm: undefined,
        isFilmDataLoading: false,
        promoFilm: undefined,
        isPromoFilmLoading: false,
        currentSimilarFilms: [],
        isSimilarFilmsLoading: false,
      }
    });
  });

  describe('fetchFilmsAction', () => {
    it('should dispatch "fetchFilmsAction.pending" and "fetchFilmsActions.fulfilled" when server response 200', async () => {
      const mockPreviewFilms = makeFakePreviewFilms();

      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, mockPreviewFilms);
      await store.dispatch(fetchFilmsAction());

      const emittedAction = store.getActions();
      const expectedActionTypes = extractActionsTypes(emittedAction);
      const fetchFilmsActionsFulfilled = emittedAction.at(1) as ReturnType<typeof fetchFilmsAction.fulfilled>;

      expect(expectedActionTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsActionsFulfilled.payload).toEqual(mockPreviewFilms);
    });

    it('should dispatch "fetchFilmsAction.pending" and "fetchFilmsAction.rejected', async() => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(404);
      await store.dispatch(fetchFilmsAction());

      const emittedAction = store.getActions();
      const expectedActionTypes = extractActionsTypes(emittedAction);

      expect(expectedActionTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type
      ]);
    });
  });

  describe('fetchFilmAction', () => {
    it('should dispatch "fetchFilmAction.pending" and "fetchFilmAction.fulfilled" when response 200', async () => {
      const mockFilm = makeFakeFilm();

      mockAxiosAdapter.onGet(`${APIRoute.Films}/${mockFilm.id}`).reply(200, mockFilm);
      await store.dispatch(fetchFilmAction({filmId: mockFilm.id}));

      const emittedAction = store.getActions();
      const expectedActionsTypes = extractActionsTypes(emittedAction);
      const fetchFilmActionFulfilled = emittedAction.at(1) as ReturnType<typeof fetchFilmAction.fulfilled>;

      expect(expectedActionsTypes).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type,
      ]);

      expect(fetchFilmActionFulfilled.payload).toEqual(mockFilm);
    });

    it('should dispatch "fetchFilmAction.pending" and "fetchFilmAction.rejected" when response 404', async () => {
      const mockFilmId = makeFakeFilmId();

      mockAxiosAdapter.onGet(`${APIRoute.Films}/${mockFilmId}`).reply(404);
      await store.dispatch(fetchFilmAction({filmId: mockFilmId}));

      const emittedActionAction = store.getActions();
      const expectedActionsTypes = extractActionsTypes(emittedActionAction);

      expect(expectedActionsTypes).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarFilmsAction', () => {
    it('should dispatch "fetchSimilarFilmsAction.pending" and "fetchSimilarFilmsFulfilled when server response 200"', async () => {
      const mockFilmId = makeFakeFilmId();
      const mockSimilarFilms = makeFakePreviewFilms();

      mockAxiosAdapter.onGet(`${APIRoute.Films}/${mockFilmId}/similar`).reply(200, mockSimilarFilms);
      await store.dispatch(fetchSimilarFilmsAction({filmId: mockFilmId}));

      const emittedAction = store.getActions();
      const expectedActionTypes = extractActionsTypes(emittedAction);
      const fetchSimilarFilmsActionFulfilled = emittedAction.at(1) as ReturnType<typeof fetchSimilarFilmsAction.fulfilled>;

      expect(expectedActionTypes).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);

      expect(fetchSimilarFilmsActionFulfilled.payload).toEqual(mockSimilarFilms);
    });

    it('should dispatch "fetchSimilarFilmsAction.pending" and "fetchSimilarFilmsAction.rejected" when server response 404', async () => {
      const mockFilmId = makeFakeFilmId();

      mockAxiosAdapter.onGet(`${APIRoute.Films}/${mockFilmId}/similar`).reply(404);

      await store.dispatch(fetchSimilarFilmsAction({filmId: mockFilmId}));

      const emittedAction = store.getActions();
      const expectedTypesAction = extractActionsTypes(emittedAction);

      expect(expectedTypesAction).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilmAction', () => {
    it('should dispatch "fetchPromoFilmAction.pending" and "fetchPromoFilmAction.fulfilled" when server response 200', async () => {
      const mockPromoFIlm = makeFakePromoFilm();

      mockAxiosAdapter.onGet(APIRoute.PromoFilm).reply(200, mockPromoFIlm);
      await store.dispatch(fetchPromoFilmAction());

      const emittedAction = store.getActions();
      const expectedTypedAction = extractActionsTypes(emittedAction);
      const fetchPromoFilmActionFulfilled = emittedAction.at(1) as ReturnType<typeof fetchPromoFilmAction.fulfilled>;

      expect(expectedTypedAction).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type,
      ]);

      expect(fetchPromoFilmActionFulfilled.payload).toEqual(mockPromoFIlm);
    });

    it('should dispatch "fetchPromoFilmAction.pending" and "fetchPromoFilmAction.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(APIRoute.PromoFilm).reply(404);
      await store.dispatch(fetchPromoFilmAction());

      const emittedAction = store.getActions();
      const expectedTypedAction = extractActionsTypes(emittedAction);

      expect(expectedTypedAction).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.rejected.type,
      ]);
    });
  });
});
