import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { dropToken } from '../../services/token';

function UserComponent(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  const signOutHandler = () => {
    dropToken();
  };

  return (
    <div className="header__container">
      {authorizationStatus === AuthorizationStatus.Auth ? <span className="header__user-name">{`${user.name}`}</span> : ''}
      {authorizationStatus === AuthorizationStatus.Auth ?
        <Link className="header__link" aria-label="Перейти в личный кабинет" to={AppRoute.Root} onClick={signOutHandler}><svg className="header__link-icon" width="12" height="14" aria-hidden="true"><use xlinkHref="#icon-account"></use></svg><span className="header__link-text">Выход</span></Link>
        : <Link className="header__link" aria-label="Перейти в личный кабинет" to={AppRoute.Login}><svg className="header__link-icon" width="12" height="14" aria-hidden="true"><use xlinkHref="#icon-account"></use></svg><span className="header__link-text">Вход</span></Link>}
    </div>
  );
}

export default UserComponent;
