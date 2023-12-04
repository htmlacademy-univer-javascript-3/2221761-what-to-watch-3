import {FC} from 'react';
import {Link} from 'react-router-dom';
import {Footer, Header, ListOfFilms, PromoCard} from '../../components';
import {CardProps} from '../../components/card/CardProps.ts';
import {PromoCardProps} from '../../components/promoCard/PromoCardProps.ts';

interface MainProps {
  promoCard: PromoCardProps;
  cards: CardProps[];
}

export const Main: FC<MainProps> = ({promoCard, cards}) => (
  <>
    <section className="film-card">
      <div className="film-card__bg">
        <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header/>
      <PromoCard
        id={promoCard.id}
        name={promoCard.name}
        genre={promoCard.name}
        released={promoCard.released}
        backgroundImage={promoCard.backgroundImage}
        posterImage={promoCard.posterImage}
        isFavorite={promoCard.isFavorite}
        videoLink={promoCard.videoLink}
      />
    </section>

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
