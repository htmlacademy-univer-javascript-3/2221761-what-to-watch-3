import {ChangeEvent, FC, FormEvent, useState} from 'react';
import { MAX_REVIEW_TEXT_LENGTH, RATING_STAR_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {getFormReviewSubmitting, postReview} from '../../store';

type FormReviewProps = {
  filmId: string;
}

export const FormReview: FC<FormReviewProps> = ({filmId}) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const isFormSubmitting = useAppSelector(getFormReviewSubmitting);

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    if (name === 'rating') {
      setRating(value);
    } else if (name === 'review-text') {
      setReviewText(value);
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      postReview({
        id: filmId,
        comment: reviewText,
        rating: Number(rating),
      })
    );
  };

  const isButtonDisabled = () => rating === '' || reviewText.length < 50 || isFormSubmitting;

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: RATING_STAR_COUNT }, (_, i) => i + 1)
              .reverse()
              .map((number) => [
                <input
                  data-testid="rating-star"
                  key={`input-star-${number}`}
                  className="rating__input"
                  onChange={handleChange}
                  id={`star-${number}`}
                  type="radio"
                  name="rating"
                  value={`${number}`}
                  checked={`${number}` === rating}
                  disabled={isFormSubmitting}
                />,
                <label
                  key={`label-star-${number}`}
                  className="rating__label"
                  htmlFor={`star-${number}`}
                >
                  Rating {number}
                </label>
              ])}
          </div>
        </div>

        <div className="add-review__text" data-testid="add-review-text">
          <textarea
            value={reviewText}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={handleChange}
            maxLength={MAX_REVIEW_TEXT_LENGTH}
            disabled={isFormSubmitting}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isButtonDisabled()}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};
