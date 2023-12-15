import {FC, useRef, useState} from 'react';
import {Card} from '../card/card.tsx';
import {PreviewTypes} from '../../models';

type ListOfFilmsProps = {
  films: PreviewTypes[];
  filmCount?: number;
}

export const ListOfFilms: FC<ListOfFilmsProps> = ({films, filmCount}) => {
  const [activeFilm, setActiveFilm] = useState('');
  const timer = useRef<NodeJS.Timeout>();

  const sliceFilms = filmCount ? films.slice(0, filmCount) : films;

  return (
    <div className="catalog__films-list">
      {sliceFilms.map((film) => (
        <Card
          key={film.id}
          id={film.id}
          previewImage={film.previewImage || ''}
          name={film.name}
          previewVideoLink={film.previewVideoLink || ''}
          isPlayingPreviewVideo={film.id === activeFilm}
          onSmallFilmCardMouseOver={() => {
            timer.current = setTimeout(() => {
              setActiveFilm(film.id);
            }, 1000);
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
