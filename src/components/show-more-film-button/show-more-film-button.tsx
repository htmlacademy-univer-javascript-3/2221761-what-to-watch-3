import {FC} from 'react';

type ShowMoreFilmButtonProps = {
  onShowMoreFilmButtonClick: () => void;
}

export const ShowMoreFilmButton: FC<ShowMoreFilmButtonProps> = ({onShowMoreFilmButtonClick}) => (
  <div className="catalog__more">
    <button onClick={onShowMoreFilmButtonClick} className="catalog__button" type="button">Show more</button>
  </div>
);
