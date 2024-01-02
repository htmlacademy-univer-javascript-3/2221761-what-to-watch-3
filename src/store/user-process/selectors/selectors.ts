import { NameSpace } from '../../../const.ts';
import { State } from '../../../types/state.ts';
import { AuthorizationStatus } from '../../../const.ts';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserAvatar = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].avatarUrl;
