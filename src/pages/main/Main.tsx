import {FC, useEffect} from 'react';
import {AllGenres, Footer, ListOfFilms, PromoCard, PromoCardProps} from '../../components';
import {Helmet} from 'react-helmet-async';
import {useTypedDispatch, useTypedSelector} from '../../hooks/redux.ts';
import {getGenreList} from '../../utils/getGenreList.ts';
import {changeCount, resetCount} from '../../store/reducers/GenreReducer.ts';

type MainProps = {
  promoCard: PromoCardProps;
}

export const Main: FC<MainProps> = ({promoCard}) => {
  const {films, filmsByGenre, shownFilmCount} = useTypedSelector((state) => state.genreReducer);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(resetCount);
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>

      <PromoCard
        id={promoCard.id}
        name={promoCard.name}
        genre={promoCard.genre}
        posterImage={promoCard.posterImage}
        backgroundImage={promoCard.backgroundImage}
        released={promoCard.released}
      />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <AllGenres genres={getGenreList(films)}/>
          <ListOfFilms films={filmsByGenre} filmCount={shownFilmCount}/>
          {shownFilmCount < filmsByGenre.length &&
            <div className="catalog__more">
              <button onClick={() => dispatch(changeCount())} className="catalog__button" type="button">Show more
              </button>
            </div>}
        </section>

        <Footer/>
      </div>
    </>
  );
};
