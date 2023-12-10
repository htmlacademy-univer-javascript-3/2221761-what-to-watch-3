import {FC, useState} from 'react';
import {FilmTab, FilmTabName} from '../../const.ts';
import cn from 'classnames';
import {TabOverview} from './TabOverview.tsx';
import {TabDetails} from './TabDetails.tsx';
import {TabReviews} from './TabReviews.tsx';
import {FilmsTypes, ReviewsTypes} from '../../models';

export type TabsProps = {
  film: FilmsTypes;
  reviews: ReviewsTypes[];
}

type GetFilmActiveTabInfoProps = {
  activeTab: string;
  film: FilmsTypes;
  reviews: ReviewsTypes[];
}

const getFilmActiveTabInfo: FC<GetFilmActiveTabInfoProps> = ({activeTab, film, reviews}) => {
  switch (activeTab) {
    case FilmTab.Overview:
      return (
        <TabOverview
          description={film.description}
          rating={film.rating}
          scoresCount={film.scoresCount}
          director={film.director}
          starring={film.starring}
        />
      );
    case FilmTab.Details:
      return (
        <TabDetails
          director={film.director}
          starring={film.starring}
          runTime={film.runTime}
          genre={film.genre}
          released={film.released}
        />
      );
    case FilmTab.Reviews:
      return (
        <TabReviews
          filmId={film.id}
          reviews={reviews}
        />
      );
    default:
      return null;
  }
};

export const Tabs: FC<TabsProps> = ({film, reviews}) => {
  const [activeTab, setActiveTab] = useState(FilmTab.Overview);

  const handleOverviewClick = () => setActiveTab(FilmTab.Overview);
  const handleDetailsClick = () => setActiveTab(FilmTab.Details);
  const handleReviewsClick = () => setActiveTab(FilmTab.Reviews);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={cn('film-nav__item', {'film-nav__item--active' : activeTab === FilmTab.Overview})}>
            <a className="film-nav__link" onClick={handleOverviewClick}>{FilmTabName[FilmTab.Overview]}</a>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active' : activeTab === FilmTab.Details})}>
            <a className="film-nav__link" onClick={handleDetailsClick}>{FilmTabName[FilmTab.Details]}</a>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active' : activeTab === FilmTab.Reviews})}>
            <a className="film-nav__link" onClick={handleReviewsClick}>{FilmTabName[FilmTab.Reviews]}</a>
          </li>
        </ul>
      </nav>
      {getFilmActiveTabInfo({activeTab, film, reviews})}
    </div>
  );
};
