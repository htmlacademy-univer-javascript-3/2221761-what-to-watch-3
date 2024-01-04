import { render, screen } from '@testing-library/react';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-components.tsx';
import {SignOut} from './sign-out.tsx';
import {logoutAction} from '../../store/user-process/api-action/api-action.ts';
import {clearMyList} from '../../store/my-list-process/slice/my-list-process.ts';

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
