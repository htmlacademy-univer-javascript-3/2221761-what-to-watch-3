import { render, screen } from '@testing-library/react';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import userEvent from '@testing-library/user-event';
import {SignOut} from './sign-out.tsx';
import {extractActionsTypes, withHistory, withStore} from '../../utils';
import {clearMyList, logoutAction} from '../../store';

describe('SignOutButton', () => {
  it('log out when sign out is clicked', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistory(<SignOut />),
      {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          avatarUrl: '',
        },
      }
    );

    render(withStoreComponent);
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);
    await userEvent.click(screen.getByTestId('log-out'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      clearMyList.type,
      logoutAction.fulfilled.type,
    ]);
  });
});
