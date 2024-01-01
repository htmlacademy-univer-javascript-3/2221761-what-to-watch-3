import {FC} from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeActiveGenre } from '../../store/genre-process/slice/genre-process.ts';
import {getActiveGenre} from '../../store/genre-process/selectors/selectors.ts';

type GenreListProps = {
  genres: string[];
  onGenreClick: () => void;
}

export const GenreList: FC<GenreListProps> = (({genres, onGenreClick}) => {
  const activeGenre = useAppSelector(getActiveGenre);
  const dispatch = useAppDispatch();

  return(
    <ul className="catalog__genres-list" data-testid="genres-container" style={{cursor: 'pointer'}}>
      {genres.map((genre: string) => (
        <li key={genre} className={cn('catalog__genres-item', {'catalog__genres-item--active': activeGenre === genre})}>
          <a onClick={() => {
            onGenreClick();
            dispatch(changeActiveGenre(genre));
          }} className="catalog__genres-link"
          >{genre}
          </a>
        </li>
      ))}
    </ul>
  );
});
