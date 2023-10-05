import React from 'react';
import Main from './pages/main/Main.tsx';
import {IMovieDataProps} from './pages';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from './const.ts';
import SignIn from './pages/signIn/SignIn.tsx';
import Film from './pages/films/Film.tsx';
import MyList from './pages/myList/MyList.tsx';
import Player from './pages/player/Player.tsx';
import AddReview from './pages/addReview/AddReview.tsx';
import NotFound from './pages/notFound/NotFound.tsx';
import PrivateRoute from './components/privateRoute/PrivateRoute.tsx';

interface AppProps {
  movieData: IMovieDataProps;
}

const App: React.FC<AppProps> = ({movieData}) => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default App;
