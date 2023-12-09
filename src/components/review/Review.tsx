import {ReviewProps} from './ReviewProps.ts';
import {FC} from 'react';

export const Review: FC<ReviewProps> = ({date, user, comment, rating}) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{comment}</p>

      <footer className="review__details">
        <cite className="review__author">{user}</cite>
        <time className="review__date" dateTime="2016-12-24">{date}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{rating}</div>
  </div>
);
