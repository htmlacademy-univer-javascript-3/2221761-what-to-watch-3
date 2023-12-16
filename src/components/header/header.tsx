import {FC} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useTypedDispatch, useTypedSelector} from '../../hooks/redux.ts';
import {logoutAction} from '../../store/api-actions.ts';

export const UserBlocking: FC<AuthorizationStatus> = (authorizationStatus) => {
  const dispatch = useTypedDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          <Link
            to={AppRoute.SignIn}
            className="user-block__link"
            onClick={(e) => {
              dispatch(logoutAction());
              e.preventDefault();
            }}
          >
            Sign out
          </Link>
        </li>
      </ul>
    );
  } else if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="user-block">
      <li className="user-block__item"></li>
    </ul>
  );
};

export const Header: FC = () => {
  const authorizationStatus = useTypedSelector((state) => state.authorizationStatus);

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Link to={AppRoute.Main} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {UserBlocking(authorizationStatus)}
    </header>
  );
};
