import {FC, useEffect} from 'react';
import {Header, Footer, ListOfFilms, Tabs, Spinner} from '../../components';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, FILM_SAME_GENRE_COUNT} from '../../const.ts';
import {Helmet} from 'react-helmet-async';
import {useTypedDispatch, useTypedSelector} from '../../hooks/redux.ts';
import useFilmById from '../../hooks/useFilmById.ts';
import {fetchFilmReviewsAction, fetchSimilarFilmsAction} from '../../store/api-actions.ts';
import {store} from '../../store/store.ts';
import {PreviewTypes, ReviewsTypes} from '../../models';

export const Film: FC = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const film = useFilmById();

  const isFilmDataLoading = useTypedSelector((state) => state.isFilmDataLoading);

  const similarFilms = useTypedSelector((state) => state.currentSimilarFilms);
  const isSimilarFilmsDataLoading = useTypedSelector((state) => state.isSimilarFilmsLoading);

  const filmReviews = useTypedSelector((state) => state.currentFilmReviews) as ReviewsTypes[];

  const authorizationStatus = useTypedSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (film) {
      store.dispatch(fetchSimilarFilmsAction({filmId: film.id}));
      store.dispatch(fetchFilmReviewsAction({filmId: film.id}));
    }
  }, [dispatch, film]);

  if (isFilmDataLoading || !film) {
    return <Spinner/>;
  }

  return (
    <>
      <Helmet>
        <title>WTW. {film.name}</title>
      </Helmet>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

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
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <Link to={`${AppRoute.Film}/${film.id}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327"/>
            </div>
            <Tabs film={film} reviews={filmReviews}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        {similarFilms?.length !== 0 && !isSimilarFilmsDataLoading &&
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <ListOfFilms films={similarFilms as PreviewTypes[]} filmCount={FILM_SAME_GENRE_COUNT}/>
          </section>}
        <Footer/>
      </div>
    </>
  );
};
