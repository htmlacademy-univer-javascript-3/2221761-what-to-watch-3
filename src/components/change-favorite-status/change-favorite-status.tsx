import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import {FC} from 'react';
import {getFavoriteFilmCount, getFavoriteFilms, postFilmFavoriteStatus} from '../../store';

type ChangeFavoriteStatusButtonProps = {
  filmId: string;
  authorizationStatus: AuthorizationStatus;
}

export const ChangeFavoriteStatus: FC<ChangeFavoriteStatusButtonProps> = ({filmId, authorizationStatus}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoriteFilmCount = useAppSelector(getFavoriteFilmCount);
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  return(
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={() => {
        if(authorizationStatus === AuthorizationStatus.Auth) {
          dispatch(postFilmFavoriteStatus({
            id: filmId,
            status: Number(!favoriteFilms.map((film) => film.id).includes(filmId)),
          }));
        } else {
          navigate(`${AppRoute.SignIn}`);
        }
      }}
    >
      {favoriteFilms.map((film) => film.id).includes(filmId) && authorizationStatus === AuthorizationStatus.Auth ? (
        <svg width="18" height="14" viewBox="0 0 18 14" data-testid="in-list">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20" data-testid="add">
          <use xlinkHref="#add"></use>
        </svg>
      )}

      <span>My list</span>
      <span className="film-card__count">{favoriteFilmCount}</span>
    </button>
  );
};
