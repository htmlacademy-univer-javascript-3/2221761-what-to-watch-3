import { Route, Routes } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';
import {useAppDispatch, useAppSelector} from '../../hooks';
import browserHistory from '../../browser-history';
import {getFilmsDataLoading} from '../../store/film-data/selectors/selectors.ts';
import {
  AddReview,
  Film,
  Main,
  MyList,
  NotFound, Player,
  SignIn
} from '../../pages';
import {HistoryRouter} from '../history-route/history-route.tsx';
import {Spinner} from '../spinner/spinner.tsx';
import {getAuthorizationStatus} from '../../store/user-process/selectors/selectors.ts';
import {useEffect} from 'react';
import {fetchFavoriteFilmsAction} from '../../store/my-list-process/api-actions/api-actions.ts';

export const App = () => {
  const dispatch = useAppDispatch();
  const isFilmsDataLoading = useAppSelector(getFilmsDataLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authorizationStatus, dispatch]);

  if (isFilmsDataLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
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
              <Route path='review' element={
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
      </HistoryRouter>
    </HelmetProvider>
  );
};
