import { useRef, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import { redirectToRoute } from '../../store/action';
import {getAuthorizationStatus} from '../../store/user-process/selectors/selectors.ts';
import {loginAction} from '../../store/user-process/api-actions/api-actions.ts';
import {Footer, Logo} from '../../components';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState({
    login: '',
    password: '',
  });

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(redirectToRoute(AppRoute.Main));
  }

  const containsAnyLetters = (password: string) => /[a-z]+/i.test(password);
  const containsAnyNumbers = (password: string) => /[0-9]+/i.test(password);
  const isValidEmail = (email: string) => /^[\w-\\.]+@+[\w-]+\.[a-z]{2,4}$/i.test(email);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      const login = loginRef.current.value;
      const password = passwordRef.current.value;

      const loginError = !isValidEmail(login) ? 'Invalid email format' : '';
      const passwordError = !containsAnyLetters(password) || !containsAnyNumbers(password)
        ? 'Password should contain letters and numbers'
        : '';

      setErrors({
        login: loginError,
        password: passwordError,
      });

      if (!loginError && !passwordError) {
        dispatch(loginAction({ login, password }));
      }
    }
  };

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. Sign in</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="sign-in__message">
            <p>{errors.login || errors.password}</p>
          </div>
          <div className="sign-in__fields">
            <div className={cn('sign-in__field', {'sign-in__field--error': errors.login !== ''})}>
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={loginRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={cn('sign-in__field', {'sign-in__field--error': errors.password !== ''})}>
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
