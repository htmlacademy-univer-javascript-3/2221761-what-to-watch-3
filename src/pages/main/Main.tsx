import {FC, useState} from 'react';
import {AllGenres, Footer, ListOfFilms, PromoCard, PromoCardProps, ShowMore} from '../../components';
import {Helmet} from 'react-helmet-async';
import { useTypedSelector} from '../../hooks/redux.ts';
import {getGenreList} from '../../utils/getGenreList.ts';
import {SHOWN_FILM_COUNT} from '../../const.ts';
import {useFilmsByGenre} from '../../hooks/filmByGenre.ts';

type MainProps = {
  promoCard: PromoCardProps;
}

export const Main: FC<MainProps> = ({promoCard}) => {
  const {films, genre} = useTypedSelector((state) => state.genreReducer);
  const [showFilm, setShowFilm] = useState<number>(SHOWN_FILM_COUNT);
  const filmsByGenre = useFilmsByGenre(genre);

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
          <AllGenres genres={getGenreList(films)} onGenreClick={() => setShowFilm(SHOWN_FILM_COUNT)}/>
          <ListOfFilms films={filmsByGenre} filmCount={showFilm}/>
          {showFilm
            < filmsByGenre.length
            && <ShowMore onShowMoreFilmButtonClick={() => setShowFilm(showFilm + SHOWN_FILM_COUNT)}/>}
        </section>

        <Footer/>
      </div>
    </>
  );
};
