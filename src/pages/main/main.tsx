import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { useFilmsByGenre } from '../../hooks/films-by-genre';
import { SHOWN_FILM_COUNT } from '../../const';
import { getGenreList } from '../../utils/get-genre-list';
import { getActiveGenre } from '../../store/genre-process/selectors';
import { getFilms, getPromoFilm, getPromoFilmLoading } from '../../store/film-data/selectors';
import { fetchPromoFilmAction } from '../../store/api-actions';
import {FilmList, Footer, GenreList, PromoFilmCard, ShowMoreFilmButton} from '../../components';
import {Spinner} from '../../components/spinner/spinner.tsx';

export const Main = () => {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(getActiveGenre);
  const films = useAppSelector(getFilms);
  const [shownFilmCount, setShownFilmCount] = useState(SHOWN_FILM_COUNT);
  const filmsByGenre = useFilmsByGenre(activeGenre);
  const promoFilmCard = useAppSelector(getPromoFilm);
  const isPromoFilmLoading = useAppSelector(getPromoFilmLoading);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  if(isPromoFilmLoading) {
    return(
      <Spinner />
    );
  }

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>
      {promoFilmCard &&
        <PromoFilmCard
          id={promoFilmCard.id}
          posterImage={promoFilmCard.posterImage}
          name={promoFilmCard.name}
          genre={promoFilmCard.genre}
          released={promoFilmCard.released}
          backgroundImage={promoFilmCard.backgroundImage}
          isFavorite={promoFilmCard.isFavorite}
        />}

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList genres={getGenreList(films)} onGenreClick={() => setShownFilmCount(SHOWN_FILM_COUNT)}/>

          <FilmList films={filmsByGenre} filmCount={shownFilmCount}/>
          {shownFilmCount < filmsByGenre.length && <ShowMoreFilmButton onShowMoreFilmButtonClick={() => setShownFilmCount(shownFilmCount + SHOWN_FILM_COUNT)} />}
        </section>

        <Footer />
      </div>
    </>
  );
};
