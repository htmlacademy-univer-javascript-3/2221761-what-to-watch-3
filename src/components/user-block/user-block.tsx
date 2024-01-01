import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import {getAuthorizationStatus, getUserAvatar} from '../../store/user-process/selectors/selectors.ts';
import {SignOut} from '../sign-out/sign-out.tsx';
import {FC} from 'react';

type GetUserBlockProps = {
  authorizationStatus: AuthorizationStatus;
  avatarUrl: string;
}

const getUserBlock: FC<GetUserBlockProps> = ({authorizationStatus, avatarUrl}) => {
  if(authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to={AppRoute.MyList}>
              <img src={avatarUrl} alt="User avatar" width="63" height="63" />
            </Link>
          </div>
        </li>
        <li className="user-block__item">
          <SignOut />
        </li>
      </ul>
    );
  } else if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="user-block">
      <li className="user-block__item"></li>
    </ul>
  );
};

export const UserBlock = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const avatarUrl = useAppSelector(getUserAvatar);
  return (
    <>
      {getUserBlock({authorizationStatus, avatarUrl})}
    </>
  );
};
