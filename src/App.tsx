import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from './const.ts';
import {AddReview, Main, MyList, NotFound, Player, SignIn, Film} from './pages';
import {PrivateRoute, PromoCardProps} from './components';
import {FilmsTypes, PreviewTypes, ReviewsTypes} from './models';

export interface AppProps {
  promoCard: PromoCardProps;
  cards: PreviewTypes[];
  reviews: ReviewsTypes[];
  films: FilmsTypes[];
}

const App: FC<AppProps> = ({promoCard,cards, reviews, films}) => (
  <Routes>
    <Route
      path={AppRoute.Main}
      element={<Main promoCard={promoCard} cards={cards} />}
    />
    <Route
      path={AppRoute.SignIn}
      element={<SignIn />}
    />
    <Route
      path={AppRoute.MyList}
      element={
        <PrivateRoute
          authorizationStatus={AuthorizationStatus.Auth}
        >
          <MyList cards={cards} />
        </PrivateRoute>
      }
    />
    <Route path={AppRoute.Film}>
      <Route index element={<NotFound />} />
      <Route path=':id'>
        <Route index element={<Film cards={cards} films={films} reviews={reviews} />} />
        <Route path='review' element={<AddReview films={films}/>} />
      </Route>
    </Route>
    <Route path={AppRoute.Player}>
      <Route index element={<NotFound />} />
      <Route path=':id' element={<Player films={films} />} />
    </Route>
    <Route
      path={AppRoute.NotFound}
      element={<NotFound />}
    />
  </Routes>
);

export default App;
