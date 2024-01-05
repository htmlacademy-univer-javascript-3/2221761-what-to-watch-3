import {Route, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import {Spinner} from '../spinner/spinner.tsx';
import {AddReview, Film, Main, MyList, NotFound, Player, SignIn} from '../../pages';
import {fetchFavoriteFilmsAction, getAuthorizationStatus, getFilmsDataLoading} from '../../store';

export const App = () => {
  const dispatch = useAppDispatch();
  const isFilmsLoading = useAppSelector(getFilmsDataLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authorizationStatus, dispatch]);

  if (isFilmsLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.FilmData}>
          <Route index element={<NotFound />} />
          <Route path=':id'>
            <Route index element={<Film />} />
            <Route
              path='review'
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                >
                  <AddReview />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
        <Route path={AppRoute.Player}>
          <Route index element={<NotFound />} />
          <Route path=':id' element={<Player />} />
        </Route>
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </HelmetProvider>
  );
};
