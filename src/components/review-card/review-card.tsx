import { getAltDate, humanizeDate } from '../../utils';
import {FC} from 'react';

export type ReviewCardProps = {
  date: string;
  user: string;
  comment: string;
  rating: number;
}

export const ReviewCard: FC<ReviewCardProps> = ({date, user, comment, rating}) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{comment}</p>

      <footer className="review__details">
        <cite className="review__author">{user}</cite>
        <time className="review__date" dateTime={getAltDate(date)}>{humanizeDate(date)}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{rating}</div>
  </div>
);
