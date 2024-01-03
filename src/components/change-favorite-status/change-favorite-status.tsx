import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import {getFavoriteFilmCount, getFavoriteFilms} from '../../store/my-list-process/selectors/selectors.ts';
import {postFilmFavoriteStatus} from '../../store/my-list-process/api-actions/api-actions.ts';

type ChangeFavoriteStatusButtonProps = {
  filmId: string;
  authorizationStatus: AuthorizationStatus;
};

export default function ChangeFavoriteStatus({ filmId, authorizationStatus }: ChangeFavoriteStatusButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoriteFilmCount = useAppSelector(getFavoriteFilmCount);
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  const isFilmInFavorites = favoriteFilms.map((film) => film.id).includes(filmId);

  const handleClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(postFilmFavoriteStatus({
        id: filmId,
        status: Number(!isFilmInFavorites),
      }));
    } else {
      navigate(`${AppRoute.SignIn}`);
    }
  };

  const buttonClassName = `btn ${isFilmInFavorites ? 'btn--remove' : 'btn--add'} film-card__button`;

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={handleClick}
    >
      {isFilmInFavorites ? (
        <svg width="18" height="14" viewBox="0 0 18 14" data-testid="in-list">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20" data-testid="add">
          <use xlinkHref="#add"></use>
        </svg>
      )}

      <span>{isFilmInFavorites ? 'Remove from' : 'Add to'} My List</span>
      {isFilmInFavorites && <span className="film-card__count">{favoriteFilmCount}</span>}
    </button>
  );
}
