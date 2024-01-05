import {beforeEach, describe, expect} from 'vitest';
import {createAPI} from '../../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../../types';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, makeFakeFilmId, makeFakeReview} from '../../../utils';
import {APIRoute, NameSpace} from '../../../const.ts';
import {postReview} from './api-action.ts';
import {redirectToRoute} from '../../action.ts';

describe('AsyncActions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleWare = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleWare);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.PostingReview]: {isFormReviewSubmitting: false},
    });
  });

  describe('postReview', () => {
    const mockId = makeFakeFilmId();
    const review = {id: mockId, comment: '', rating: 0};

    it('should dispatch "postReview.pending", "postReview.fulfilled" and redirectToRoute when server response 201', async () => {
      const mockReview = makeFakeReview();

      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockId}`).reply(201, mockReview);
      await store.dispatch(postReview(review));

      const emittedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedAction);

      expect(extractedActionsTypes).toEqual([
        postReview.pending.type,
        redirectToRoute.type,
        postReview.fulfilled.type,
      ]);
    });

    it('dispatches "postReview.pending", "postReview.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockId}`).reply(400);

      await store.dispatch(postReview(review));

      const emittedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedAction);

      expect(extractedActionsTypes).toEqual([
        postReview.pending.type,
        postReview.rejected.type,
      ]);
    });
  });
});
