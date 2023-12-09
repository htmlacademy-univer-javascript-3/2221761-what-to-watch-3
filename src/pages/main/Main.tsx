import {FC} from 'react';
import {Link} from 'react-router-dom';
import {Footer, ListOfFilms, PromoCard, PromoCardProps} from '../../components';
import {Helmet} from 'react-helmet-async';
import {PreviewTypes} from '../../models/PreviewTypes.ts';

type MainProps = {
  promoCard: PromoCardProps;
  cards: PreviewTypes[];
}

export const Main: FC<MainProps> = ({promoCard, cards}) => (
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

        <ul className="catalog__genres-list">
          <li className="catalog__genres-item catalog__genres-item--active">
            <Link to="/" className="catalog__genres-link">All genres</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="/" className="catalog__genres-link">Comedies</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="/" className="catalog__genres-link">Crime</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="/" className="catalog__genres-link">Documentary</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="/" className="catalog__genres-link">Dramas</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="/" className="catalog__genres-link">Horror</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="/" className="catalog__genres-link">Kids & Family</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="/" className="catalog__genres-link">Romance</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="/" className="catalog__genres-link">Sci-Fi</Link>
          </li>
          <li className="catalog__genres-item">
            <Link to="/" className="catalog__genres-link">Thrillers</Link>
          </li>
        </ul>

        <ListOfFilms films={cards}/>

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>

      <Footer/>
    </div>
  </>
);
