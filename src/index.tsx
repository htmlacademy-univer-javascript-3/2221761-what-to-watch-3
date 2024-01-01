import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {App} from './components';
import {fetchFilmsAction} from './store/film-data/api-actions/api-actions.ts';
import {checkAuthAction} from './store/user-process/api-actions/api-actions.ts';
import {fetchFavoriteFilmsAction} from './store/my-list-process/api-actions/api-actions.ts';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavoriteFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
