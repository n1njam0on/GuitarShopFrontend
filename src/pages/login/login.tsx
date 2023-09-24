import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { AuthData } from '../../types/auth-data-type';
import { loginAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

const PASSWORD_MIN_LENGTH = 6;

function Login(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null && passwordRef.current.value.length >= PASSWORD_MIN_LENGTH){
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div>
      <Header/>
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">Hовый пользователь? <Link className="login__link" to={`${AppRoute.Registration}`}>Зарегистрируйтесь</Link> прямо сейчас</p>
            <form method="post" action="" onSubmit={handleSubmit}>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input ref={loginRef} type="email" id="email" name="email" autoComplete="off" required />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="passwordLogin">Введите пароль</label>
                <span>
                  <input ref={passwordRef} type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" required />
                  <button className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button>
                </span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium" type="submit">Войти</button>
            </form>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Login;
