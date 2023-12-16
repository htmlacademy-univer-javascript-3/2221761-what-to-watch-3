import {FC} from 'react';
import {Review} from '../review/review.tsx';
import {ReviewsTypes} from '../../models';

export type TabReviewsProps = {
  reviews: ReviewsTypes[];
}

export const TabReviews: FC<TabReviewsProps> = ({reviews}) => (
  <div className="film-card__reviews film-card__row">
    <div className="film-card__reviews-col">
      {reviews.map((review) => (
        <Review
          key={review.id}
          date={review.date}
          user={review.user}
          comment={review.comment}
          rating={review.rating}
        />
      ))}
    </div>
  </div>
);
