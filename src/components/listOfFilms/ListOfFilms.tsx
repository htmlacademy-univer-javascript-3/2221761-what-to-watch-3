import {FC, useRef, useState} from 'react';
import {PreviewTypes} from '../../models/PreviewTypes.ts';
import {Card} from '../card/Card.tsx';

type ListOfFilmsProps = {
  films: PreviewTypes[];
}

export const ListOfFilms: FC<ListOfFilmsProps> = ({films}: ListOfFilmsProps) => {
  const [activeFilm, setActiveFilm] = useState('');
  const timer = useRef<NodeJS.Timeout>();

  return (
    <div className="catalog__films-list">
      {films.map((film: PreviewTypes) => (
        <Card
          key={film.id}
          id={film.id}
          previewImage={film.previewImage}
          name={film.name}
          previewVideoLink={film.previewVideoLink}
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
