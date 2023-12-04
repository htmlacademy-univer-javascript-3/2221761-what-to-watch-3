import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {FC} from 'react';
import {CardProps} from './CardProps.ts';

export const Card: FC<CardProps> = ({id, previewImage, name}) => (
  <>
    <div className="small-film-card__image">
      <img src={previewImage} alt={name} width="280" height="175" />
    </div>
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={`${AppRoute.Film}/${id}`}>{name}</Link>
    </h3>
  </>
);
