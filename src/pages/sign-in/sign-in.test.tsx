import {describe, expect} from 'vitest';
import {createMemoryHistory} from 'history';
import {SignIn} from './sign-in.tsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {APIRoute, AppRoute} from '../../const.ts';
import {extractActionsTypes, makeFakeStore, withHistory, withStore} from '../../utils';
import {fetchFavoriteFilmsAction, loginAction, redirectToRoute} from '../../store';

describe('component: SignIn', () => {
  const mockHistory = createMemoryHistory();
  const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
    withHistory(<SignIn />),
    makeFakeStore()
  );

  const mockEmail = 'test@mail.ru';
  const mockPassword = 'password1';
  const mockWrongEmail = 'wrongEmail';
  const mockWrongPassword = '1';
  const loginText = /Email address/i;
  const passwordText = /Password/i;

  it('render correctly', () => {
    render(withStoreComponent);

    expect(screen.getByLabelText(loginText)).toBeInTheDocument();
    expect(screen.getByLabelText(passwordText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    render(withStoreComponent);

    await userEvent.type(screen.getByPlaceholderText(loginText), mockEmail);
    await userEvent.type(screen.getByPlaceholderText(passwordText), mockPassword);

    expect(screen.getByDisplayValue(mockEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPassword)).toBeInTheDocument();
  });

  it('should display email error', async () => {
    const textError = /Invalid email format/i;
    render(withStoreComponent);
    await userEvent.type(
      screen.getByPlaceholderText(loginText),
      mockWrongEmail
    );
    await userEvent.type(screen.getByPlaceholderText(passwordText), mockPassword);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByDisplayValue(mockWrongEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPassword)).toBeInTheDocument();
    expect(screen.getByText(textError)).toBeInTheDocument();
  });

  it('should display password error', async () => {
    const textError = /Password should contain letters and numbers/i;
    render(withStoreComponent);
    await userEvent.type(screen.getByPlaceholderText(loginText), mockEmail);
    await userEvent.type(
      screen.getByPlaceholderText(passwordText),
      mockWrongPassword
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByDisplayValue(mockEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockWrongPassword)).toBeInTheDocument();
    expect(screen.getByText(textError)).toBeInTheDocument();
  });

  it('should sing in user and redirect to main page', async () => {
    render(withStoreComponent);
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, { avatarUrl: '' });
    mockAxiosAdapter.onGet(APIRoute.FavoriteFilms).reply(200, {});
    await userEvent.type(screen.getByPlaceholderText(loginText), mockEmail);
    await userEvent.type(screen.getByPlaceholderText(passwordText), mockPassword);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(mockHistory.location.pathname).toBe(AppRoute.Main);
    expect(actions).toEqual([
      loginAction.pending.type,
      fetchFavoriteFilmsAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
      fetchFavoriteFilmsAction.fulfilled.type,
    ]);
  });
});
