import {FC} from 'react';
import {Header, Footer, ListOfFilms} from '../../components';
import {Helmet} from 'react-helmet-async';
import {PreviewTypes} from '../../models';

type MyLIstProps = {
  cards: PreviewTypes[];
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
