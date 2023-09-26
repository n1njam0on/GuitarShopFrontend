import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { GuitarType } from '../../types/guitar-type.enum';
import { StringsNumber } from '../../types/strings-number.enum';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CreateGuitar } from '../../types/create-guitar-type';
import { createGuitarAction, updateGuitarAction, uploadAction } from '../../store/api-actions';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Guitar } from '../../types/guitar-type';

const TITLE_MIN_LENGTH = 10;
const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MIN_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 1024;
const VENDORE_CODE_MIN_LENGT = 5;
const VENDORE_CODE_MAX_LENGTH = 40;
const PRICE_MIN_VALUE = 100;
const PRICE_MAX_VALUE = 1000000;
const ADD_NEW_ITEM = -1;
const INITIAL_GUITAR = {
  guitarType: GuitarType.Acoustic,
  stringsNumber: StringsNumber.Seven,
  title: '',
  description: '',
  vendorCode: '',
  price: 0,
  photo: '',
  creationDate: '',
  guitarId: ''
};

function AddItem(): JSX.Element {

  const { index } = useParams();
  let scrinType = ADD_NEW_ITEM;
  if (index) {
    scrinType = parseInt(index, 10);
  }
  let guitar: Guitar = useAppSelector((state) => state.guitars[scrinType]);
  if (scrinType === ADD_NEW_ITEM) {
    guitar = INITIAL_GUITAR;
  }


  const dispatch = useAppDispatch();

  const [guitarType, setGuitarType] = useState<string>(guitar.guitarType);
  const [stringsNumber, setStringsNumber] = useState<string>(guitar.stringsNumber);
  const [file, setFile] = useState<File>();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const creationDateRef = useRef<HTMLInputElement | null>(null);
  const vendorCodeRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const acousticRef = useRef<HTMLInputElement | null>(null);
  const electroRef = useRef<HTMLInputElement | null>(null);
  const ukuleleRef = useRef<HTMLInputElement | null>(null);
  const previewImageRef = useRef<HTMLImageElement | null>(null);

  const onSubmit = (createData: CreateGuitar) => {
    if (scrinType === ADD_NEW_ITEM) {
      dispatch(createGuitarAction(createData));
    }
    dispatch(updateGuitarAction(createData));
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (creationDateRef.current !== null && vendorCodeRef.current !== null && descriptionRef.current !== null && priceRef.current !== null && titleRef.current !== null && guitarType !== '') {
      dayjs.extend(customParseFormat);
      const date = dayjs(creationDateRef.current.value, 'DD.MM.YYYY').format('MM.DD.YYYY');
      onSubmit({
        id: guitar.guitarId,
        title: titleRef.current.value,
        vendorCode: vendorCodeRef.current.value,
        price: priceRef.current.value,
        description: descriptionRef.current.value,
        guitarType: guitarType,
        stringsNumber: stringsNumber,
        creationDate: date,
      });
    }
  };

  const guitarTypeHandler = (evt: ChangeEvent) => {
    const type = evt.target.getAttribute('value');
    if (type) {
      setGuitarType(type);
    }
  };

  const stringsNumberHandler = (evt: ChangeEvent) => {
    const type = evt.target.getAttribute('value');
    if (type) {
      setStringsNumber(type);
      if (acousticRef.current && electroRef.current && ukuleleRef.current) {
        acousticRef.current.checked = false;
        electroRef.current.checked = false;
        ukuleleRef.current.checked = false;
      }
      setGuitarType('');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const prevFile = e.target.files[0];
      setFile(e.target.files[0]);
      const fileReader = new FileReader();
      fileReader.onload = function () {
        if (previewImageRef.current) {
          previewImageRef.current.setAttribute('src', fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(prevFile);
    }
  };

  const editImageButtonHandler = () => {
    if (file) {
      const form = new FormData();
      form.append(file.name, file);
      dispatch(uploadAction({ guitarId: guitar.guitarId, file: form }));
    }
  };

  return (
    <div>
      <Header />
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
            <form className="add-item__form" action="#" method="get" onSubmit={submitHandler}>
              <div className="add-item__form-left">
                <div className="edit-item-image add-item__form-image">
                  <input type="file" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} />
                  <div className="edit-item-image__image-wrap">
                    <img ref={previewImageRef} id="prevImage" src="" alt="guitarPhoto" />
                  </div>
                  <div className="edit-item-image__btn-wrap">
                    <button className="button button--small button--black-border edit-item-image__btn" disabled onClick={editImageButtonHandler} >Добавить</button>
                    <button className="button button--small button--black-border edit-item-image__btn" disabled>Удалить</button>
                  </div>
                </div>
                <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
                  <input ref={acousticRef} id='guitar' type="radio" name="item-type" value={GuitarType.Acoustic} onChange={guitarTypeHandler} disabled={stringsNumber === StringsNumber.Four} defaultChecked={guitarType === GuitarType.Acoustic} />
                  <label htmlFor="guitar">Акустическая гитара</label>
                  <input ref={electroRef} id='el-guitar' type="radio" name="item-type" value={GuitarType.Electro} onChange={guitarTypeHandler} disabled={stringsNumber === StringsNumber.Twelve} defaultChecked={guitarType === GuitarType.Electro} />
                  <label htmlFor="el-guitar">Электрогитара</label>
                  <input ref={ukuleleRef} id='ukulele' type="radio" name="item-type" value={GuitarType.Ukulele} onChange={guitarTypeHandler} disabled={stringsNumber !== StringsNumber.Four} defaultChecked={guitarType === GuitarType.Ukulele} />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
                <div className="input-radio add-item__form-radio"><span>Количество струн</span>
                  <input type="radio" id="string-qty-4" name="string-qty" value={StringsNumber.Four} onChange={stringsNumberHandler} defaultChecked={stringsNumber === StringsNumber.Four} />
                  <label htmlFor="string-qty-4">4</label>
                  <input type="radio" id="string-qty-6" name="string-qty" value={StringsNumber.Six} onChange={stringsNumberHandler} defaultChecked={stringsNumber === StringsNumber.Six} />
                  <label htmlFor="string-qty-6">6</label>
                  <input type="radio" id="string-qty-7" name="string-qty" value={StringsNumber.Seven} onChange={stringsNumberHandler} defaultChecked={stringsNumber === StringsNumber.Seven} />
                  <label htmlFor="string-qty-7">7</label>
                  <input type="radio" id="string-qty-12" name="string-qty" value={StringsNumber.Twelve} onChange={stringsNumberHandler} defaultChecked={stringsNumber === StringsNumber.Twelve} />
                  <label htmlFor="string-qty-12">12</label>
                </div>
              </div>
              <div className="add-item__form-right">
                <div className="custom-input add-item__form-input">
                  <label><span>Дата добавления товара</span>
                    <input ref={creationDateRef} type="text" name="date" value={dayjs(new Date()).format('DD.MM.YYYY')} placeholder="Дата в формате 00.00.0000" readOnly />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input">
                  <label><span>Введите наименование товара</span>
                    <input ref={titleRef} type="text" name="title" defaultValue={guitar.title} placeholder="Наименование" minLength={TITLE_MIN_LENGTH} maxLength={TITLE_MAX_LENGTH} required />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                  <label><span>Введите цену товара</span>
                    <input ref={priceRef} type="number" name="price" defaultValue={guitar.price === 0 ? '' : guitar.price} placeholder="Цена в формате 00 000" min={PRICE_MIN_VALUE} max={PRICE_MAX_VALUE} required />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input add-item__form-input">
                  <label><span>Введите артикул товара</span>
                    <input ref={vendorCodeRef} type="text" name="sku" defaultValue={guitar.vendorCode} placeholder="Артикул товара" minLength={VENDORE_CODE_MIN_LENGT} maxLength={VENDORE_CODE_MAX_LENGTH} required />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-textarea add-item__form-textarea">
                  <label><span>Введите описание товара</span>
                    <textarea ref={descriptionRef} name="description" defaultValue={guitar.description} placeholder="" minLength={DESCRIPTION_MIN_LENGTH} maxLength={DESCRIPTION_MAX_LENGTH} required></textarea>
                  </label>
                  <p>Заполните поле</p>
                </div>
              </div>
              <div className="add-item__form-buttons-wrap">
                <button className="button button--small add-item__form-button" type="submit" disabled={guitarType === ''}>Сохранить изменения</button>
                <button className="button button--small add-item__form-button" type="button">Вернуться к списку товаров</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AddItem;
