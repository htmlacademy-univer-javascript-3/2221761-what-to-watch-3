import {FC, useState} from 'react';
import {Card } from '../card/Card.tsx';
import {CardProps} from '../card/CardProps.ts';

type ListOfFilmsProps = {
  films: CardProps[];
}

export const ListOfFilms: FC<ListOfFilmsProps> = ({films}) => {
  const [active, setActive] = useState({});

  return (
    <div className="catalog__films-list">
      {films.map((film: CardProps) => (
        <article className="small-film-card catalog__films-card" key={film.id} onMouseEnter={() => {
          setActive(film);
          return active;
        }}
        >
          <Card
            id={film.id}
            name={film.name}
            genre={film.genre}
            previewImage={film.previewImage}
            previewVideoLink={film.previewVideoLink}
          />
        </article>
      ))}
    </div>
  );
};
