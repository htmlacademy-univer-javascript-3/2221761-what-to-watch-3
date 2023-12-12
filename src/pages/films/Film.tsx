import {FC} from 'react';
import {Header, Footer, ListOfFilms, Tabs} from '../../components';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {Helmet} from 'react-helmet-async';
import {FilmsTypes, ReviewsTypes} from '../../models';
import {useTypedSelector} from '../../hooks/redux.ts';
import {useFilmsByGenre} from '../../hooks/filmByGenre.ts';

type FilmProps = {
  films: FilmsTypes[];
  reviews: ReviewsTypes[];
}

export const Film: FC<FilmProps> = ({films, reviews}) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const film = films.find((item) => item.id === id) as FilmsTypes;
  const genre = useTypedSelector((state) => state.genreReducer.genre);
  const filmsByGenre = useFilmsByGenre(genre);

  return (
    <>
      <Helmet>
        <title>WTW. {film.name}</title>
      </Helmet>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${AppRoute.Player}/${film.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={`${AppRoute.Film}/${film.id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327" />
            </div>
            <Tabs film={film} reviews={reviews}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <ListOfFilms films={filmsByGenre} filmCount={4}/>
        </section>

        <Footer />
      </div>
    </>
  );
};
