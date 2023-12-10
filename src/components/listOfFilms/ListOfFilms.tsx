import {FC, useRef, useState} from 'react';
import {Card} from '../card/Card.tsx';
import {PreviewTypes} from '../../models';

type ListOfFilmsProps = {
  films: PreviewTypes[];
  genre: string;
}

export const ListOfFilms: FC<ListOfFilmsProps> = ({films, genre}: ListOfFilmsProps) => {
  const [activeFilm, setActiveFilm] = useState('');
  const timer = useRef<NodeJS.Timeout>();

  const filmsGenre = films.filter((film) => film.genre === genre).slice(0, 4 + 1) ?? films;

  return (
    <div className="catalog__films-list">
      {filmsGenre.map((film) => (
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
