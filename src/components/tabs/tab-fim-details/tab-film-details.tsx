import { getRunTime } from '../../../utils/get-run-time/get-run-time.ts';
import {FC} from 'react';

export type FilmDetailsProps = {
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
}

export const FilmDetails: FC<FilmDetailsProps> = ({director, starring, runTime, genre, released}) => (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">
          {starring.map((star, index) => (
            index === starring.length - 1
              ? <span key={`id-${star}`} data-testid={star}>{star}</span>
              : <span key={`id-${star}`} data-testid={star}>{star}, <br/></span>)
          )};
        </span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{getRunTime(runTime)}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{released}</span>
      </p>
    </div>
  </div>
);
