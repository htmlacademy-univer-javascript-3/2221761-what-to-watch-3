import {FC} from 'react';

type ShowMoreProps = {
  onShowMoreFilmButtonClick: () => void;
}

export const ShowMore: FC<ShowMoreProps> = ({onShowMoreFilmButtonClick}) => (
  <div className="catalog__more">
    <button onClick={onShowMoreFilmButtonClick} className="catalog__button" type="button">Show more
    </button>
  </div>
);
