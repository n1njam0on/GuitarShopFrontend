import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { dropToken } from '../../services/token';
import { fetchGuitarsAction } from '../../store/api-actions';

function Header(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const signOutHandler = () => {
    dropToken();
    dispatch(fetchGuitarsAction());
  };

  return (

    <header className={`${authorizationStatus === AuthorizationStatus.Auth ? 'header--admin header' : 'header' }`} id="header">
      <div className="container">
        <div className="header__wrapper"><Link className="header__logo logo" to="/"><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" /></Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><Link className="link main-nav__link" to="/">Каталог</Link>
              </li>
              <li className="main-nav__item"><Link className="link main-nav__link" to="/">Список товаров</Link>
              </li>
            </ul>
          </nav>
          <div className="header__container">
            {authorizationStatus === AuthorizationStatus.Auth ? <span className="header__user-name">{`${user.name}`}</span> : ''}
            {authorizationStatus === AuthorizationStatus.Auth ?
              <Link className="header__link" aria-label="Перейти в личный кабинет" to={AppRoute.Root} onClick={signOutHandler}><svg className="header__link-icon" width="12" height="14" aria-hidden="true"><use xlinkHref="#icon-account"></use></svg><span className="header__link-text">Выход</span></Link>
              : <Link className="header__link" aria-label="Перейти в личный кабинет" to={AppRoute.Login}><svg className="header__link-icon" width="12" height="14" aria-hidden="true"><use xlinkHref="#icon-account"></use></svg><span className="header__link-text">Вход</span></Link>}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
