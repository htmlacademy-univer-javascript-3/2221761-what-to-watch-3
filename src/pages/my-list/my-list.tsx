import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilmCount, getFavoriteFilms, getFavoriteFilmsDataLoading } from '../../store/my-list-process/selectors/selectors.ts';
import { useEffect } from 'react';
import {FilmList, Footer, Logo, UserBlock} from '../../components';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {fetchFavoriteFilmsAction} from '../../store/my-list-process/api-actions/api-actions.ts';

export const MyList = () => {
  const dispatch = useAppDispatch();
  const favoriteFilmCount = useAppSelector(getFavoriteFilmCount);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavoriteFilmsDataLoading = useAppSelector(getFavoriteFilmsDataLoading);

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, [dispatch]);

  if(isFavoriteFilmsDataLoading) {
    return(
      <Spinner />
    );
  }

  return(
    <div className="user-page">
      <Helmet>
        <title>WTW. My list</title>
      </Helmet>

      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilmCount}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favoriteFilms} />
      </section>

      <Footer />
    </div>
  );
};
