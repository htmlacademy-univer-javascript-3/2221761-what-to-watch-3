export const AppRoute = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  Film: '/films',
  Player: '/player',
  NotFound: '*'
};

export const APIRoute = {
  Films: '/films',
  Login: '/login',
  Logout: '/logout',
  Comments: '/comments',
};

export const SHOWN_FILM_COUNT = 8;
export const DEFAULT_GENRES = 'All genres';

export const TIMEOUT_SHOW_ERROR = 2000;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const FilmTab = {
  Overview:'OVERVIEW',
  Details:'DETAILS',
  Reviews:'REVIEWS'
};

export const FilmTabName = {
  [FilmTab.Overview]: 'Overview',
  [FilmTab.Details]: 'Details',
  [FilmTab.Reviews]: 'Reviews',
};
