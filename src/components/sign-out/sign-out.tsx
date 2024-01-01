import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const';
import {logoutAction} from '../../store/user-process/api-actions/api-actions.ts';

export const SignOut = () => {
  const dispatch = useAppDispatch();
  return(
    <Link
      className="user-block__link"
      to={AppRoute.SignIn}
      onClick={(evt) => {
        evt.preventDefault();
        dispatch(logoutAction());
      }}
    >
      Sign out
    </Link>
  );
};
