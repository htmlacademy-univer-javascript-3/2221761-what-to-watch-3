import {FC} from 'react';
import {Header, Footer, ListOfFilms} from '../../components';
import {CardProps} from '../../components/card/CardProps.ts';
import {Helmet} from 'react-helmet-async';

type MyLIstProps = {
  cards: CardProps[];
}

export const MyList: FC<MyLIstProps> = ({cards}) => (
  <div className="user-page">
    <Helmet>
      <title>WTW. My list</title>
    </Helmet>
    <Header />
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <div className="catalog__films-list">
        <ListOfFilms films={cards}/>
      </div>
    </section>

    <Footer/>
  </div>
);
