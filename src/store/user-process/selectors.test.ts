import {describe} from 'vitest';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {makeFakeAvatarUrl} from '../../utils/mocks.ts';
import {getAuthorizationStatus, getUserAvatar} from './selectors.ts';

describe('', () => {
  const mockAuthorizationStatus = AuthorizationStatus.Auth;
  const mockAvatarUrl = makeFakeAvatarUrl();

  const state = {
    [NameSpace.User]: {
      authorizationStatus: mockAuthorizationStatus,
      avatarUrl: mockAvatarUrl,
    }
  };

  it ('should return "authorizationStatus" from state', () => {
    const {authorizationStatus} = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return "AvatarUrl" from state', () => {
    const {avatarUrl} = state[NameSpace.User];
    const result = getUserAvatar(state);
    expect(result).toBe(avatarUrl);
  });
});
