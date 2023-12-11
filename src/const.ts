export const AppRoute = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  Film: '/films',
  Player: '/player',
  NotFound: '*'
};

export const SHOWN_FILM_COUNT = 8;
export const DEFAULT_GENRES = 'All genres';

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
