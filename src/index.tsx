import React from 'react';
import ReactDOM from 'react-dom/client';
import App, {AppProps} from './App.tsx';
import {BrowserRouter} from 'react-router-dom';

import {HelmetProvider} from 'react-helmet-async';
import {films} from './mocks/films.ts';
import {reviews} from './mocks/reviews.ts';
import {promoFilm} from './mocks/promoCard.ts';
import {PreviewTypes} from './models/PreviewTypes/PreviewTypes.ts';

const app: AppProps = {
  promoCard: promoFilm,
  cards: films.slice(1, films.length) as PreviewTypes[],
  reviews: reviews,
  films: films
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App promoCard={app.promoCard} cards={app.cards} reviews={app.reviews} films={app.films}/>
      </React.StrictMode>
    </BrowserRouter>
  </HelmetProvider>
);
