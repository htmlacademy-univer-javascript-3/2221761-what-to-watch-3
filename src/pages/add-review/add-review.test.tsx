import { createMemoryHistory } from 'history';
import { makeFakeFilm, makeFakeStore } from '../../utils/mocks';
import { AppRoute, NameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import {withHistory, withStore} from '../../utils/mock-components.tsx';
import {AddReview} from './add-review.tsx';

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
