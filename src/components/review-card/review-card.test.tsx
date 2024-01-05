import { render, screen } from '@testing-library/react';
import {ReviewCard} from './review-card.tsx';
import {humanizeDate, makeFakeReview, withHistory} from '../../utils';

describe('ReviewCard', () => {
  it('render correctly', () => {
    const review = makeFakeReview();
    const reviewDate = review.date;
    const reviewUser = review.user;
    const reviewRating = review.rating;
    const reviewComment = review.comment;
    const expectedFormatDate = humanizeDate(reviewDate);

    const preparedComponent = withHistory(
      <ReviewCard
        date={reviewDate}
        user={reviewUser}
        rating={reviewRating}
        comment={reviewComment}
      />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedFormatDate)).toBeInTheDocument();
    expect(screen.getByText(reviewUser)).toBeInTheDocument();
    expect(screen.getByText(reviewRating)).toBeInTheDocument();
    expect(screen.getByText(reviewComment)).toBeInTheDocument();
  });
});
