import { Review } from '../../types/review';
import {FC} from 'react';
import {ReviewCard} from '../index.ts';

type FilmReviewsProps = {
  reviews: Review[];
}

export const FilmReviews: FC<FilmReviewsProps> = ({reviews}) => (
  <div className="film-card__reviews film-card__row">
    <div className="film-card__reviews-col">
      {reviews.map((review: Review) => (
        <ReviewCard
          key={review.id}
          date={review.date}
          comment={review.comment}
          user={review.user}
          rating={review.rating}
        />
      ))}
    </div>
  </div>
);
