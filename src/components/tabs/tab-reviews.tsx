import {FC} from 'react';
import {Review} from '../review/review.tsx';
import {ReviewsTypes} from '../../models';

export type TabReviewsProps = {
  filmId: string;
  reviews: ReviewsTypes[];
}

export const TabReviews: FC<TabReviewsProps> = ({filmId, reviews}) => {
  const reviewsFilm = reviews.filter((review) => review.filmId === filmId);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsFilm.map((review) => (
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
};
