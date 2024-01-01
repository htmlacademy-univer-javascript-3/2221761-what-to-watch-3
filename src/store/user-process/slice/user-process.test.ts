import {describe, expect} from 'vitest';
import {AuthorizationStatus} from '../../../const.ts';
import {userProcess} from './user-process.ts';
import {makeFakeAvatarUrl} from '../../../utils/mocks.ts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions/api-actions.ts';

describe('UserProcess slice', () => {
  const mockAvatarUrl = makeFakeAvatarUrl();

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: ''};
    const result = userProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {authorizationStatus: AuthorizationStatus.Unknown, avatarUrl: ''};
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const initialState = {authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: ''};
    const expectedState = {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: mockAvatarUrl};
    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(mockAvatarUrl,'', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with with "checkAuthAction.rejected" action', () => {
    const initialState = {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: mockAvatarUrl};
    const expectedState = {authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: ''};
    const result = userProcess.reducer(initialState, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = {authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: ''};
    const expectedState = {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: mockAvatarUrl};
    const result = userProcess.reducer(initialState, loginAction.fulfilled(mockAvatarUrl, '', {login: '', password: ''}));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: mockAvatarUrl};
    const expectedState = {authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: ''};
    const result = userProcess.reducer(initialState, loginAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "logoutAction.fulfilled" action', () => {
    const initialState = {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: mockAvatarUrl};
    const expectedState = {authorizationStatus: AuthorizationStatus.NoAuth, avatarUrl: ''};
    const result = userProcess.reducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
