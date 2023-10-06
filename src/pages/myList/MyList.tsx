import React from 'react';
import {Logo, Footer, Card} from '../../components';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

export const MyList: React.FC = () => (
  <div className="user-page">
    <header className="page-header user-page__head">
      <Logo />

      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link to={AppRoute.SignIn} className="user-block__link">Sign out</Link>
        </li>
      </ul>
    </header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <div className="catalog__films-list">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>

    <Footer/>
  </div>
);
