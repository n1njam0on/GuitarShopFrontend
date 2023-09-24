import { GuitarType } from './guitar-type.enum';
import { StringsNumber } from './strings-number.enum';

export type Guitar = {
  id: string;
  title: string;
  description: string;
  photo: string;
  guitarType:GuitarType;
  vendorCode: string;
  stringsNumber: StringsNumber;
  price: number;
  createdAt: string;
}
