import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';

interface IPrivateRouteProps {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRoute({authorizationStatus, children}: IPrivateRouteProps) {

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn}/>
  );
}
