import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {App} from './components';
import {fetchFilmsAction} from './store/film-data/api-actions/api-actions.ts';
import {checkAuthAction} from './store/user-process/api-actions/api-actions.ts';
import HistoryRouter from './components/history-route/history-route.tsx';
import browserHistory from './browser-history.ts';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
