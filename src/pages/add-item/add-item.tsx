import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function AddItem(): JSX.Element {
  return (
    <div>
      <Header/>
      <main className="page-content">
        <section className="add-item">
          <div className="container">
            <h1 className="add-item__title">Новый товар</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><Link className="link" to={`${AppRoute.Login}`} >Вход</Link>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={`${AppRoute.Root}`}>Товары</Link>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={`${AppRoute.Add}`}>Новый товар</Link>
              </li>
            </ul>
            <form className="add-item__form" action="#" method="get">
              <div className="add-item__form-left">
                <div className="edit-item-image add-item__form-image">
                  <div className="edit-item-image__image-wrap">
                  </div>
                  <div className="edit-item-image__btn-wrap">
                    <button className="button button--small button--black-border edit-item-image__btn">Добавить
                    </button>
                    <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                  </div>
                </div>
                <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
                  <input type="radio" id="guitar" name="item-type" value="guitar" />
                  <label htmlFor="guitar">Акустическая гитара</label>
                  <input type="radio" id="el-guitar" name="item-type" value="el-guitar" checked />
                  <label htmlFor="el-guitar">Электрогитара</label>
                  <input type="radio" id="ukulele" name="item-type" value="ukulele" />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
                <div className="input-radio add-item__form-radio"><span>Количество струн</span>
                  <input type="radio" id="string-qty-4" name="string-qty" value="4" checked />
                  <label htmlFor="string-qty-4">4</label>
                  <input type="radio" id="string-qty-6" name="string-qty" value="6" />
                  <label htmlFor="string-qty-6">6</label>
                  <input type="radio" id="string-qty-7" name="string-qty" value="7" />
                  <label htmlFor="string-qty-7">7</label>
                  <input type="radio" id="string-qty-12" name="string-qty" value="12" />
                  <label htmlFor="string-qty-12">12</label>
                </div>
              </div>
              <div className="add-item__form-right">
                <div className="custom-input add-item__form-input">
                  <label><span>Дата добавления товара</span>
                    <input type="text" name="date" value="" placeholder="Дата в формате 00.00.0000" readOnly />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input">
                  <label><span>Введите наименование товара</span>
                    <input type="text" name="title" value="" placeholder="Наименование" />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                  <label><span>Введите цену товара</span>
                    <input type="text" name="price" value="" placeholder="Цена в формате 00 000" />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input">
                  <label><span>Введите артикул товара</span>
                    <input type="text" name="sku" value="" placeholder="Артикул товара" />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-textarea add-item__form-textarea">
                  <label><span>Введите описание товара</span>
                    <textarea name="description" placeholder=""></textarea>
                  </label>
                  <p>Заполните поле</p>
                </div>
              </div>
              <div className="add-item__form-buttons-wrap">
                <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
                <button className="button button--small add-item__form-button" type="button">Вернуться к списку товаров</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default AddItem;
