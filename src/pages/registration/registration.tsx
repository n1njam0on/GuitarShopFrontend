import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { registrationAction } from '../../store/api-actions';
import { RegistrationData } from '../../types/registration-data-type';

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 12;
const NAME_MIN_LENGHT = 1;
const NANE_MAX_LENGHT = 15;

function Registration(): JSX.Element {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = (regData: RegistrationData) => {
    dispatch(registrationAction(regData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null && nameRef.current !== null) {
      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
      });
    }
  };

  return (
    <div>
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Регистрация</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-login">
                <label htmlFor="name">Введите имя</label>
                <input ref={nameRef} type="text" id="name" name="name" autoComplete="off" required minLength={NAME_MIN_LENGHT} maxLength={NANE_MAX_LENGHT} />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input ref={emailRef} type="email" id="email" name="email" autoComplete="off" required />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="password">Придумайте пароль</label>
                <span>
                  <input ref={passwordRef} type="password" placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" required minLength={PASSWORD_MIN_LENGTH} maxLength={PASSWORD_MAX_LENGTH}/>
                  <button className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button>
                </span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Registration;
