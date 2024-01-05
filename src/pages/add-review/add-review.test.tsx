import { createMemoryHistory } from 'history';
import { AppRoute, NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import {AddReview} from './add-review.tsx';
import {makeFakeFilm, makeFakeStore, withHistory, withStore} from '../../utils';

describe('AddReviewScreen', () => {
  const mockHistory = createMemoryHistory();
  const mockFilm = makeFakeFilm();

  beforeEach(() => {
    mockHistory.push(`${AppRoute.FilmData}/${mockFilm.id}/review`);
  });

  it('render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<AddReview />, mockHistory),
      makeFakeStore({
        [NameSpace.Film]: {
          films: [],
          isFilmsDataLoading: false,
          currentFilm: mockFilm,
          isFilmDataLoading: false,
          promoFilm: undefined,
          isPromoFilmLoading: false,
          currentSimilarFilms: [],
          isSimilarFilmsLoading: false
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
  });
});
