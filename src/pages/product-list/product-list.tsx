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
import { SortType } from '../../types/sort-type.enum';
import { SortDirection } from '../../types/sort-diretion.enum';
import { countArrayLength } from '../../utils/utils';

const MAX_GUITARS_NUMBER_PER_QUERY = 21;
const MAX_GUITARS_NUMBER_PER_PAGE = 7;
const MAX_NUMBER_PAGES = 3;
const GUITAR_MAX_LIMIT = 1000;

const arrayRange = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index);

function ProductList(): JSX.Element {

  const dispatch = useAppDispatch();
  const guitarsMain = useAppSelector((state) => state.guitars);
  const guitarsQuantity = guitarsMain.length;

  const [guitarTypes, setGuitarType] = useState<string[]>([]);
  const [stringsNumber, setStringsNumber] = useState<string[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.Date);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextCount, setNextCount] = useState(0);

  const guitars = guitarsMain.slice((currentPage - 1) * MAX_GUITARS_NUMBER_PER_PAGE, MAX_GUITARS_NUMBER_PER_PAGE * currentPage);

  const maxNextCount = countArrayLength(guitarsQuantity, MAX_GUITARS_NUMBER_PER_QUERY) + 1;

  let paginationArray;
  if (((nextCount * 3) + 2) * MAX_GUITARS_NUMBER_PER_PAGE > guitarsMain.length) {
    const difference = guitarsMain.length - (nextCount * MAX_NUMBER_PAGES) * MAX_GUITARS_NUMBER_PER_PAGE;
    const extraPages = countArrayLength(difference, MAX_GUITARS_NUMBER_PER_PAGE);
    paginationArray = arrayRange((nextCount * MAX_NUMBER_PAGES) + 1, (nextCount * MAX_NUMBER_PAGES) + extraPages + 1, 1);
  } else {
    paginationArray = arrayRange((nextCount * MAX_NUMBER_PAGES) + 1, (nextCount * MAX_NUMBER_PAGES) + MAX_NUMBER_PAGES, 1);
  }


  const makeRequest = async () => {
    let query = sortDirection === SortDirection.Desc ? '?sortDirection=desc' : '?sortDirection=asc';
    query += guitarTypes.length ? `&guitarType=${guitarTypes.join()}` : '';
    query += stringsNumber.length ? `&stringsNumber=${stringsNumber.join()}` : '';
    query += sortType === SortType.Price ? '&price=on' : '';
    query += `&limit=${GUITAR_MAX_LIMIT}`;
    await dispatch(fetchGuitarsAction(query));
  };

  useEffect(() => {
    makeRequest();
    setCurrentPage(1);
    setNextCount(0);
  }, [guitarTypes, stringsNumber, sortType, sortDirection]);// eslint-disable-line

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
      setGuitarType([]);
    }
  };

  const sortTypeHandler = () => {
    if (sortType === SortType.Date) {
      setSortType(SortType.Price);
    } else {
      setSortType(SortType.Date);
    }
  };

  const sortDyrectionHandler = () => {
    if (sortDirection === SortDirection.Desc) {
      setSortDirection(SortDirection.Asc);
    } else {
      setSortDirection(SortDirection.Desc);
    }
  };

  const clearButtonHandler = () => {
    setGuitarType([]);
    setStringsNumber([]);
  };

  const nextPaginationHandler = () => {
    setNextCount((prev) => prev + 1);
    setCurrentPage(((nextCount + 1) * MAX_NUMBER_PAGES) + 1);
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
                    <input className="visually-hidden" type="checkbox" id="acoustic" name={GuitarType.Acoustic} onChange={guitarTypeHandler} checked={guitarTypes.includes(GuitarType.Acoustic)} disabled={stringsNumber.includes(StringsNumber.Four) && stringsNumber.length === 1} />
                    <label htmlFor="acoustic">Акустические гитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="electric" name={GuitarType.Electro} onChange={guitarTypeHandler} checked={guitarTypes.includes(GuitarType.Electro)} disabled={stringsNumber.includes(StringsNumber.Twelve) && stringsNumber.length === 1} />
                    <label htmlFor="electric">Электрогитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="ukulele" name={GuitarType.Ukulele} onChange={guitarTypeHandler} checked={guitarTypes.includes(GuitarType.Ukulele)} disabled={!stringsNumber.includes(StringsNumber.Four) && stringsNumber.length !== 0} />
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
                <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={clearButtonHandler}>Очистить</button>
              </form>
              <div className="catalog-sort">
                <h2 className="catalog-sort__title">Сортировать:</h2>
                <div className="catalog-sort__type">
                  <button className={sortType === SortType.Date ? 'catalog-sort__type-button catalog-sort__type-button--active' : 'catalog-sort__type-button'} aria-label="по цене" name={SortType.Date} onClick={sortTypeHandler}>по дате</button>
                  <button className={sortType === SortType.Price ? 'catalog-sort__type-button catalog-sort__type-button--active' : 'catalog-sort__type-button'} aria-label="по цене" name={SortType.Price} onClick={sortTypeHandler}>по цене</button>
                </div>
                <div className="catalog-sort__order">
                  <button className={sortDirection === SortDirection.Asc ? 'catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active' : 'catalog-sort__order-button catalog-sort__order-button--up'} aria-label="По возрастанию" name="Asc" onClick={sortDyrectionHandler}></button>
                  <button className={sortDirection === SortDirection.Desc ? 'catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active' : 'catalog-sort__order-button catalog-sort__order-button--down'} aria-label="По убыванию" name="Desc" onClick={sortDyrectionHandler}></button>
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
                              <p className="catalog-item__data-date">{`Дата добавления ${dayjs(guitar.creationDate).format('DD-MM-YYYY')}`}</p>
                              <p className="catalog-item__data-price">{`${guitar.price}₽`}</p>
                            </div>
                          </div>
                          <div className="catalog-item__buttons"><Link className="button button--small button--black-border" aria-label="Редактировать товар" to={`${AppRoute.Add}/${index}`}>Редактировать</Link>
                            <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
                          </div>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </div>
            <Link className="button product-list__button button--red button--big" to={`${AppRoute.Add}/-1`}>Добавить новый товар</Link>
            <div className="pagination product-list__pagination">
              <ul className="pagination__list">
                {
                  paginationArray.map((page) => {
                    const keyValue = `${page}`;
                    return (
                      <div key={keyValue} >
                        <li className={currentPage === page ? 'pagination__page pagination__page--active' : 'pagination__page pagination__page'}> <div className="link pagination__page-link" onClick={() => setCurrentPage(page)}>{page}</div>
                        </li>
                      </div>
                    );
                  })
                }
                {nextCount + 1 < maxNextCount ? <li className="pagination__page pagination__page--next" id="next"><div className="link pagination__page-link" onClick={nextPaginationHandler} >Далее</div></li> : ''}
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
