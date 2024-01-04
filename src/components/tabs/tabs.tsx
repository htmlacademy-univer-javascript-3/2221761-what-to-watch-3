import cn from 'classnames';
import {FC, useState} from 'react';
import { FilmTab, FilmTabNameInterface } from '../../const';
import { Film } from '../../types/film';
import { Review } from '../../types/review';
import {FilmOverview, FilmDetails, FilmReviews} from '../index.ts';
import {Link} from 'react-router-dom';

type TabsProps = {
  film: Film;
  reviews: Review[];
}

const getFilmActiveTabInfo = (activeTab: string, film: Film, reviews: Review[]) => {
  switch(activeTab) {
    case FilmTab.Overview:
      return (
        <FilmOverview
          description={film.description}
          rating={film.rating}
          scoresCount={film.scoresCount}
          director={film.director}
          starring={film.starring}
        />);
    case FilmTab.Details:
      return (
        <FilmDetails
          director={film.director}
          starring={film.starring}
          genre={film.genre}
          runTime={film.runTime}
          released={film.released}
        />);
    case FilmTab.Reviews:
      return(
        <FilmReviews reviews={reviews} />
      );
    default:
      break;
  }
};

export const Tabs: FC<TabsProps> = ({film, reviews}) => {
  const [activeTab, setActiveTab] = useState(FilmTab.Overview);

  const handlerOverviewLinkClick = () => setActiveTab(FilmTab.Overview);

  const handlerDetailsLinkClick = () => setActiveTab(FilmTab.Details);

  const handlerReviewsLinkClick = () => setActiveTab(FilmTab.Reviews);
  return(
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list" style={{cursor: 'pointer'}}>
          <li className={cn('film-nav__item', {'film-nav__item--active': activeTab === FilmTab.Overview})}>
            <Link
              to='#'
              className="film-nav__link"
              onClick={handlerOverviewLinkClick}
              data-testid="film-overview-link"
            >
              {FilmTabNameInterface[FilmTab.Overview]}
            </Link>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active': activeTab === FilmTab.Details})}>
            <Link
              to='#'
              className="film-nav__link"
              onClick={handlerDetailsLinkClick}
              data-testid="film-details-link"
            >
              {FilmTabNameInterface[FilmTab.Details]}
            </Link>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active': activeTab === FilmTab.Reviews})}>
            <Link
              to='#'
              className="film-nav__link"
              onClick={handlerReviewsLinkClick}
              data-testid="film-reviews-link"
            >
              {FilmTabNameInterface[FilmTab.Reviews]}
            </Link>
          </li>
        </ul>
      </nav>

      {getFilmActiveTabInfo(activeTab, film, reviews)}
    </div>
  );
};
