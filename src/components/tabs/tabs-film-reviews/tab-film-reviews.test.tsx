import { render, screen } from '@testing-library/react';
import { Review } from '../../../types/review.ts';
import {withHistory} from '../../../utils/mock-components.tsx';
import {FilmReviews} from './tab-film-reviews.tsx';

describe('FilmReviews', () => {
  it('render correctly', () => {
    const reviews = [] as Review[];

    const filmReviewsId = 'film-card__reviews-col';

    const preparedComponent = withHistory(<FilmReviews reviews={reviews} />);

    render(preparedComponent);

    expect(screen.getByTestId(filmReviewsId)).toBeInTheDocument();
  });
});
