import { GuitarType } from './guitar-type.enum';
import { StringsNumber } from './strings-number.enum';

export type Guitar = {
  guitarId: string;
  title: string;
  description: string;
  photo: string;
  guitarType:GuitarType;
  vendorCode: string;
  stringsNumber: StringsNumber;
  price: number;
  creationDate: string;
}
