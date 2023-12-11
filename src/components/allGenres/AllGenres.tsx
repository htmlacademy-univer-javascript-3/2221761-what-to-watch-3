import cn from 'classnames';
import {useTypedDispatch, useTypedSelector} from '../../hooks/redux.ts';
import {FC} from 'react';
import {changeGenre, resetCount, showFilms} from '../../store/reducers/GenreReducer.ts';

type AllGenresProps = {
  genres: string[];
}

export const AllGenres: FC<AllGenresProps> = ({genres}) => {
  const activeGenre = useTypedSelector((state) => state.genreReducer.genre);
  const dispatch = useTypedDispatch();

  return(
    <ul className="catalog__genres-list">
      {genres.map((genre: string) => (
        <li key={genre} className={cn('catalog__genres-item', {'catalog__genres-item--active': activeGenre === genre})}>
          <a onClick={() => {
            dispatch(changeGenre({ genre: genre }));
            dispatch(showFilms());
            dispatch((resetCount));
          }} className="catalog__genres-link"
          >{genre}
          </a>
        </li>
      ))}
    </ul>
  );
};
