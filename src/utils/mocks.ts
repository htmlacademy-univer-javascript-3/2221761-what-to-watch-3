import {name, random, finance, image, internet, commerce} from 'faker';
import {PromoFilm} from '../types/promo-film.ts';
import {PreviewFilm} from '../types/preview-film.ts';
import faker from 'faker';
import {FavoriteFilmPostData} from '../types/favorite-film-post-data.ts';
import {Review} from '../types/review.ts';
import {Action} from 'redux';
import {createAPI} from '../services/api.ts';
import {State} from '../types/state.ts';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {AuthorizationStatus, DEFAULT_GENRE, NameSpace} from '../const.ts';

export const makeFakeReview = (): Review => ({
  id: faker.random.alphaNumeric(10),
  date: faker.date.past().toISOString(),
  user: faker.name.firstName(),
  comment: faker.random.words(),
  rating: Number(finance.amount(1, 10, 0)),
});

export const makeFakeFilm = () => ({
  id: faker.random.alphaNumeric(10),
  name: faker.name.title(),
  posterImage: faker.image.imageUrl(),
  backgroundImage: faker.image.imageUrl(),
  backgroundColor: '#ffffff',
  videoLink: faker.internet.url(),
  description: faker.commerce.productDescription(),
  rating: Number(finance.amount(1, 10, 0)),
  scoresCount: Number(finance.amount(1, 10, 1)),
  director: faker.name.firstName(),
  starring: [faker.name.firstName()],
  runTime: Number(finance.amount(1, 100, 0)),
  genre: faker.random.word(),
  released: Number(finance.amount(1, 100, 0)),
  isFavorite: false,
});


export const makeFakePromoFilm = (): PromoFilm => (
  {
    id: random.alpha({count: 10}),
    name: name.title(),
    posterImage: image.imageUrl(),
    backgroundImage: '#ffffff',
    videoLink: internet.url(),
    genre: random.word(),
    released: Number(finance.amount(1, 100, 0)),
    isFavorite: false,
  }
);

export const makeFakePreviewFilms = (): PreviewFilm[] => ([
  {
    id: random.alpha({count: 10}),
    name: name.title(),
    previewImage: image.imageUrl(),
    previewVideoLink: internet.url(),
    genre: random.word(),
  },
]);

export const makeFakeFavoriteFilmPostData = (): FavoriteFilmPostData => ({
  id: random.alpha({count: 10}),
  name: name.title(),
  posterImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: '#ffffff',
  videoLink: internet.url(),
  description: commerce.productDescription(),
  rating: Number(finance.amount(1, 10, 0)),
  scoresCount: Number(finance.amount(1, 10, 1)),
  director: name.firstName(),
  starring: [name.firstName()],
  runTime: Number(finance.amount(1, 100, 0)),
  genre: random.word(),
  released: Number(finance.amount(1, 100, 0)),
  isFavorite: false,
  previewImage: image.imageUrl(),
  previewVideoLink: internet.url(),
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.Film]: {
    films: makeFakePreviewFilms(),
    isFilmsDataLoading: false,
    currentFilm: makeFakeFilm(),
    isFilmDataLoading: false,
    promoFilm: makeFakePromoFilm(),
    isPromoFilmLoading: false,
    currentSimilarFilms: makeFakePreviewFilms(),
    isSimilarFilmsLoading: false,
  },
  [NameSpace.Genre]: {
    genre: DEFAULT_GENRE,
  },
  [NameSpace.MyList]: {
    favoriteFilms: [],
    favoriteFilmCount: 0,
    isFavoriteFilmsLoading: false,
  },
  [NameSpace.PostingReview]: {
    isFormReviewSubmitting: false,
  },
  [NameSpace.Review]: {
    currentFilmReviews: [makeFakeReview()],
    isFilmReviewsLoading: false,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    avatarUrl: '',
  },
  ...(initialState ?? {}),
});

export const makeFakeAvatarUrl = (): string => internet.url();

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeFilmId = (): string => random.alpha({count: 10});
