import {beforeEach, describe, expect, vi} from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import {
  checkAuthAction, loginAction, logoutAction,
} from './api-action.ts';
import {createAPI} from '../../../services/api.ts';
import {APIRoute, NameSpace} from '../../../const.ts';
import {redirectToRoute} from '../../action.ts';
import * as tokenStorage from '../../../services/token.ts';
import {AuthData, State} from '../../../types';
import {AppThunkDispatch, extractActionsTypes, makeFakeAvatarUrl} from '../../../utils';
import {clearMyList, fetchFavoriteFilmsAction} from '../../my-list-process';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleWare = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleWare);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.User]: {avatarUrl: ''}
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch pending "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
      const expectedUrl = makeFakeAvatarUrl();

      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, {avatarUrl: expectedUrl});
      await store.dispatch(checkAuthAction());

      const emittedAction = store.getActions();
      const expectedActionsTypes = extractActionsTypes(emittedAction);
      const checkAuthActionFulfilled = emittedAction.at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(expectedActionsTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);

      expect(checkAuthActionFulfilled.payload).toEqual(expectedUrl);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);
      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "LoginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};
      const avatarUrl = makeFakeAvatarUrl();

      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, {token: 'secret', avatarUrl: avatarUrl});
      await store.dispatch(loginAction(fakeUser));
      const emittedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedAction);
      const loginActionFulfilled = emittedAction.at(3) as ReturnType<typeof loginAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        loginAction.pending.type,
        fetchFavoriteFilmsAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);

      expect(loginActionFulfilled.payload).toBe(avatarUrl);
    });

    it('should call "saveToken" once with received token', async () => {
      const avatarUrl = makeFakeAvatarUrl();
      const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};
      const fakeServer = {token: 'secret', avatarUrl: avatarUrl};

      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServer);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServer.token);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" when server response 400', async () =>{
      const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);
      await store.dispatch(loginAction(fakeUser));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      await store.dispatch(logoutAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        logoutAction.pending.type,
        clearMyList.type,
        logoutAction.fulfilled.type,
      ]);

      it('should one call "dropToken" with "logoutAction"', async () => {
        mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

        const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
        await store.dispatch(logoutAction());

        expect(mockDropToken).toBeCalledTimes(1);
      });
    });
  });
});
