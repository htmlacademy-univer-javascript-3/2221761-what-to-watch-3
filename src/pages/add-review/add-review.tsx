import {FC} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import useFilmById from '../../hooks/useFilmById.ts';
import {useTypedSelector} from '../../hooks/redux.ts';
import {FormReview, Spinner} from '../../components';

export const AddReview: FC = () => {
  const film = useFilmById();
  const isFilmDataLoading = useTypedSelector((state) => state.isFilmDataLoading);

  if (isFilmDataLoading || !film) {
    return <Spinner/>;
  }

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>WTW. Add review {film.name}</title>
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
                <Link to={`${AppRoute.Film}/${film.id}`} className="breadcrumbs__link">
                  {film.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Film}/${film.id}/review`} className="breadcrumbs__link">
                  Add review
                </Link>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link className="user-block__link" to={AppRoute.SignIn}>
                Sign out
              </Link>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <FormReview filmId={film.id} />
    </section>
  );
};
