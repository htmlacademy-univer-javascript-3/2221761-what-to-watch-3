import {beforeEach, describe, expect} from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import {
  checkAuthAction,
} from './api-actions.ts';
import {createAPI} from '../../../services/api.ts';
import {State} from '../../../types/state.ts';
import {AppThunkDispatch, extractActionsTypes, makeFakeAvatarUrl} from '../../../utils/mocks.ts';
import {APIRoute, NameSpace} from '../../../const.ts';

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
});
