import { makeFakePromoFilm, makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import {withHistory, withStore} from '../../utils/mock-components.tsx';
import {PromoFilmCard} from './promo-film-card.tsx';

describe('PromoFilmCard', () => {
  it('render correctly', () => {
    const promoFilmCard = makeFakePromoFilm();

    const { withStoreComponent } = withStore(
      withHistory(
        <PromoFilmCard
          id={promoFilmCard.id}
          posterImage={promoFilmCard.posterImage}
          name={promoFilmCard.name}
          genre={promoFilmCard.genre}
          released={promoFilmCard.released}
          backgroundImage={promoFilmCard.backgroundImage}
        />
      ),
      makeFakeStore(),
    );
    render(withStoreComponent);

    expect(screen.getByText(promoFilmCard.name)).toBeInTheDocument();
    expect(screen.getByText(promoFilmCard.genre)).toBeInTheDocument();
    expect(screen.getByText(promoFilmCard.released)).toBeInTheDocument();
  });
});
