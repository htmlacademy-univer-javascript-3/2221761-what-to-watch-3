import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';

interface IPrivateRouteProps {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRoute({authorizationStatus, children}: IPrivateRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.SignIn}/>;
}
