import { DEBOUNCE_TIME_FOR_PREVIEW_VIDEO } from '../../const';
import { PreviewFilm } from '../../types/preview-film';
import {FC, useRef, useState} from 'react';
import {SmallFilmCard} from '../small-film-card/small-film-card.tsx';

type FilmListProps = {
  films: PreviewFilm[];
  filmCount?: number;
}

export const FilmList: FC<FilmListProps> = ({films, filmCount}) => {
  const [activeFilm, setActiveFilm] = useState('');
  const timer = useRef<NodeJS.Timeout>();
  const sliceFilms = filmCount ? films.slice(0, filmCount) : films;

  return (
    <div className="catalog__films-list">
      {sliceFilms.map((film: PreviewFilm) => (
        <SmallFilmCard
          key={film.id}
          id={film.id}
          previewImage={film.previewImage}
          name={film.name}
          previewVideoLink={film.previewVideoLink}
          isPlayingPreviewVideo={film.id === activeFilm}
          onSmallFilmCardMouseOver={() => {
            timer.current = setTimeout(() => {
              setActiveFilm(film.id);
            }, DEBOUNCE_TIME_FOR_PREVIEW_VIDEO);
          }}
          onSmallFilmCardMouseOut={() => {
            clearTimeout(timer.current);
            setActiveFilm('');
          }}
        />
      ))}
    </div>
  );
};
