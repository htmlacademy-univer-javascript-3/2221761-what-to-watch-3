import {useRef, FormEvent, useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import {Footer, Logo} from '../../components';
import {getAuthorizationStatus, loginAction, redirectToRoute} from '../../store';
import {emailRegx, passwordRegxAnyLetters, passwordRegxAnyNumbers} from '../../utils';


export const SignIn = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleAuthRedirect = () => {
      if (authorizationStatus === AuthorizationStatus.Auth) {
        dispatch(redirectToRoute(AppRoute.Main));
      }
    };

    handleAuthRedirect();
  }, [authorizationStatus, dispatch]);

  const [errors, setErrors] = useState({
    login: '',
    password: '',
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      const login = loginRef.current.value;
      const password = passwordRef.current.value;

      const loginError = !emailRegx(login) ? 'Invalid email format' : '';
      const passwordError = !passwordRegxAnyLetters(password) || !passwordRegxAnyNumbers(password)
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
                data-testid='loginElement'
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
                data-testid='passwordElement'
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
