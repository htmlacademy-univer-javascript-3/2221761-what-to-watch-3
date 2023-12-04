import {FC} from 'react';
import {Link, useParams} from 'react-router-dom';
import {FilmsTypes} from '../../models/FimsTypes.ts';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const.ts';
import {FormReview} from '../../components';

interface AddReviewProps {
  films: FilmsTypes[];
}

export const AddReview: FC<AddReviewProps> = ({films}) => {
  const {id} = useParams();
  const film = films.find((item) => item.id === id) as FilmsTypes;

  return (
    <section className="film-card film-card--full">
      <Helmet>
        WTW. Add review {film.name}
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${film.id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src={film.posterImage} alt={film.name} width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link className="user-block__link" to={AppRoute.SignIn}>Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>
      <FormReview/>

    </section>
  );
};
