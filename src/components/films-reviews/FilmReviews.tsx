import {ReviewProps} from '../review/ReviewProps.ts';
import {FC} from 'react';
import {Review} from '../review/Review.tsx';

type FilmReviewsProps = {
  reviews: ReviewProps[];
}

export const FilmReviews: FC<FilmReviewsProps> = ({reviews}: FilmReviewsProps) => (
  <div className="film-card__reviews film-card__row">
    <div className="film-card__reviews-col">
      {reviews.map((review: ReviewProps) => (
        <Review
          key={review.id}
          id={review.id}
          date={review.date}
          comment={review.comment}
          user={review.user}
          rating={review.rating}
        />
      ))}
    </div>
  </div>
);
