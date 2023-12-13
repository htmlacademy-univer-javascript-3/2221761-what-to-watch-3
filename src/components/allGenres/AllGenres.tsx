import cn from 'classnames';
import {useTypedDispatch, useTypedSelector} from '../../hooks/redux.ts';
import {FC} from 'react';
import {changeGenre} from '../../store/reducer.ts';

type AllGenresProps = {
  genres: string[];
  onGenreClick: () => void;
}

export const AllGenres: FC<AllGenresProps> = ({genres, onGenreClick}) => {
  const activeGenre = useTypedSelector((state) => state.genreReducer.genre);
  const dispatch = useTypedDispatch();

  return(
    <ul className="catalog__genres-list">
      {genres.map((genre: string) => (
        <li key={genre} className={cn('catalog__genres-item', {'catalog__genres-item--active': activeGenre === genre})}>
          <a onClick={() => {
            onGenreClick();
            dispatch(changeGenre({ genre: genre }));
          }} className="catalog__genres-link"
          >{genre}
          </a>
        </li>
      ))}
    </ul>
  );
};
