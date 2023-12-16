import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {AddReview, Main, MyList, NotFound, Player, SignIn, Film} from '../../pages';
import {PrivateRoute, PromoCardProps, Spinner} from '../index.ts';
import {FilmsTypes, PreviewTypes} from '../../models';
import {useTypedSelector} from '../../hooks/redux.ts';


export type AppProps = {
  promoCard: PromoCardProps;
  cards: PreviewTypes[];
  films: FilmsTypes[];
}

const App: FC<AppProps> = ({promoCard,cards, films}) => {
  const filmLoading = useTypedSelector((state) => state.isFilmDataLoading);

  if (filmLoading) {
    return <Spinner/>;
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Main promoCard={promoCard} />}
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
          <Route index element={<Film/>} />
          <Route path='review' element={<AddReview/>} />
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
};

export default App;
