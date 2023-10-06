import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, IMovieDataProps} from './const.ts';
import {AddReview, Main, MyList, NotFound, Player, SignIn, Film} from './pages';
import {PrivateRoute} from './components';


interface AppProps {
  movieData: IMovieDataProps;
}

const App: React.FC<AppProps> = ({movieData}) => (
  <Routes>
    <Route
      path={AppRoute.Main}
      element={<Main name={movieData.name} genre={movieData.genre} date={movieData.date} />}
    />
    <Route
      path={AppRoute.SignIn}
      element={<SignIn />}
    />
    <Route
      path={AppRoute.Film}
      element={<Film />}
    />
    <Route
      path={AppRoute.MyList}
      element={
        <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
          <MyList/>
        </PrivateRoute>
      }
    />
    <Route
      path={AppRoute.Player}
      element={<Player />}
    />
    <Route
      path={AppRoute.AddReview}
      element={<AddReview />}
    />
    <Route
      path={AppRoute.NotFound}
      element={<NotFound />}
    />
  </Routes>
);

export default App;
