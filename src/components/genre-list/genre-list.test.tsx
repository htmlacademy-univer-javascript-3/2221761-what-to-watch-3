import { render, screen } from '@testing-library/react';
import { DEFAULT_GENRE, NameSpace } from '../../const';
import {GenreList} from './genre-list.tsx';
import {makeFakeStore, withHistory, withStore} from '../../utils';

describe('GenreList', () => {
  const mockGenre = 'Action';
  const mockGenres = [DEFAULT_GENRE, mockGenre];
  const onGenreClick = vi.fn();

  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<GenreList genres={mockGenres} onGenreClick={onGenreClick} />),
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByTestId(`tab-${DEFAULT_GENRE}`)).toBeInTheDocument();
    expect(screen.getByTestId(`tab-${DEFAULT_GENRE}`)).toHaveClass(
      'catalog__genres-item--active'
    );
    expect(screen.getByTestId(`tab-${mockGenre}`)).toBeInTheDocument();
  });

  it('select active genre', () => {
    const { withStoreComponent } = withStore(
      withHistory(<GenreList genres={mockGenres} onGenreClick={onGenreClick} />),
      makeFakeStore({
        [NameSpace.Genre]: { genre: mockGenre },
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId(`tab-${mockGenre}`)).toHaveClass(
      'catalog__genres-item--active'
    );
  });
});
