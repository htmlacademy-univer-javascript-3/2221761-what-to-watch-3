import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {useTypedDispatch} from '../../hooks/redux.ts';
import {postReview} from '../../store/api-actions.ts';
import {RATING_STAR} from '../../const.ts';

type FormReviewProps = {
  filmId: string;
}

export const FormReview: FC<FormReviewProps> = ({filmId}) => {
  const dispatch = useTypedDispatch();
  const [rating, setRating] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => setRating(e.target.value);

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => setReviewText(e.target.value);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRating(rating);
    setReviewText(reviewText);
    dispatch(
      postReview({
        id: filmId,
        comment: reviewText,
        rating: Number(rating),
      })
    );
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: RATING_STAR }, (_, i) => i++)
              .reverse()
              .map((number) => [
                <input
                  key={`input-star-${number}`}
                  className="rating__input"
                  onChange={handleRatingChange}
                  id={`star-${number}`}
                  type="radio"
                  name="rating"
                  value={`${number}`}
                  checked={`${number}` === rating}
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

        <div className="add-review__text">
          <textarea
            value={reviewText}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={handleReviewChange}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

