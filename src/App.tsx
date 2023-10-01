import React from 'react';
import Main from './pages/Main';

import { IMovieDataProps } from './pages';

interface AppProps {
  movieData: IMovieDataProps;
}

const App: React.FC<AppProps> = ({movieData}) => (
  <div>
    <Main
      name={movieData.name}
      genre={movieData.genre}
      date={movieData.date}
    />
  </div>
);

export default App;
