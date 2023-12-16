import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {films} from './mocks/films.ts';
import {promoFilm} from './mocks/promoCard.ts';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';
import {PreviewTypes} from './models';
import {AppProps, HistoryRouter} from './components';
import App from './components/app/App.tsx';
import {ToastContainer} from 'react-toastify';
import {browserHistory} from './utils/browser-history.ts';
import {checkAuthAction, fetchFilmsAction} from './store/api-actions.ts';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const app: AppProps = {
  promoCard: promoFilm,
  cards: films.slice(1, films.length) as PreviewTypes[],
  films: films
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HelmetProvider>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <React.StrictMode>
          <ToastContainer/>
          <App
            promoCard={app.promoCard}
            cards={app.cards}
            films={app.films}
          />
        </React.StrictMode>
      </Provider>
    </HistoryRouter>
  </HelmetProvider>
);
