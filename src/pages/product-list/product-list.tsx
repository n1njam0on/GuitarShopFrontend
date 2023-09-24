import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGuitarsAction } from '../../store/api-actions';
import { ChangeEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { GuitarType } from '../../types/guitar-type.enum';
import { StringsNumber } from '../../types/strings-number.enum';


function ProductList(): JSX.Element {

  const dispatch = useAppDispatch();
  const guitars = useAppSelector((state) => state.guitars);

  const [guitarTypes, setGuitarType] = useState<string[]>([]);
  const [stringsNumber, setStringsNumber] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchGuitarsAction());
    console.log(guitarTypes);// eslint-disable-line
    console.log(stringsNumber);// eslint-disable-line
  }, [guitarTypes, stringsNumber]);// eslint-disable-line

  const guitarTypeHandler = (evt: ChangeEvent) => {
    const type = evt.target.getAttribute('name');
    if (type) {
      if (guitarTypes.includes(type)) {
        setGuitarType((prevState) => prevState.filter((item) => item !== type));
      } else {
        setGuitarType((prevState) => [...prevState, type]);
      }
    }
  };

  const stringsNumberHandler = (evt: ChangeEvent) => {
    const type = evt.target.getAttribute('name');
    if (type) {
      if (stringsNumber.includes(type)) {
        setStringsNumber((prevState) => prevState.filter((item) => item !== type));
      } else {
        setStringsNumber((prevState) => [...prevState, type]);
      }
    }
  };

  return (
    <div>
      <Header />
      <main className="page-content">
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
              </li>
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Товары</a>
              </li>
            </ul>
            <div className="catalog">
              <form className="catalog-filter" action="#" method="post">
                <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">Тип гитар</legend>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="acoustic" name={GuitarType.Acoustic} onChange={guitarTypeHandler} />
                    <label htmlFor="acoustic">Акустические гитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="electric" name={GuitarType.Electro} onChange={guitarTypeHandler} />
                    <label htmlFor="electric">Электрогитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="ukulele" name={GuitarType.Ukulele} onChange={guitarTypeHandler} />
                    <label htmlFor="ukulele">Укулеле</label>
                  </div>
                </fieldset>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">Количество струн</legend>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="4-strings" name={StringsNumber.Four} onChange={stringsNumberHandler} />
                    <label htmlFor="4-strings">4</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="6-strings" name={StringsNumber.Six} onChange={stringsNumberHandler} />
                    <label htmlFor="6-strings">6</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="7-strings" name={StringsNumber.Seven} onChange={stringsNumberHandler} />
                    <label htmlFor="7-strings">7</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="12-strings" name={StringsNumber.Twelve} onChange={stringsNumberHandler} />
                    <label htmlFor="12-strings">12</label>
                  </div>
                </fieldset>
                <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
              </form>
              <div className="catalog-sort">
                <h2 className="catalog-sort__title">Сортировать:</h2>
                <div className="catalog-sort__type">
                  <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене">по дате</button>
                  <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
                </div>
                <div className="catalog-sort__order">
                  <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
                  <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию"></button>
                </div>
              </div>
              <div className="catalog-cards">
                <ul className="catalog-cards__list">
                  {
                    guitars.map((guitar, index) => {
                      const keyValue = `${index} + ${guitar.price}`;
                      return (
                        <li key={keyValue} className="catalog-item">
                          <div className="catalog-item__data"><img src={guitar.photo} srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
                            <div className="catalog-item__data-wrapper">
                              <a className="link" href="./product.html"><p className="catalog-item__data-title">{`${guitar.title}`}</p></a>
                              <br />
                              <p className="catalog-item__data-date">{`Дата добавления ${dayjs(guitar.createdAt).format('DD-MM-YYYY')}`}</p>
                              <p className="catalog-item__data-price">{`${guitar.price}₽`}</p>
                            </div>
                          </div>
                          <div className="catalog-item__buttons"><Link className="button button--small button--black-border" aria-label="Редактировать товар" to={`${AppRoute.Edit}`}>Редактировать</Link>
                            <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
                          </div>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </div>
            <button className="button product-list__button button--red button--big">Добавить новый товар</button>
            <div className="pagination product-list__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                </li>
                <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ProductList;
