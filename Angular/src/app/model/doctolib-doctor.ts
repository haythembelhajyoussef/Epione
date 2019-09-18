import {Formation} from './formation';
import {Price} from './price';

export class DoctolibDoctor {
  fullName: string;
  speciality: string;
  address: string;
  img: string;
  latitude: number;
  longitude: number;
  path: string;
  ratesRefunds: string;
  paymentMethode: string;
  bookable: boolean;
  description: string;
  tel: string;
  email: string;
  password: string;
  formations: Formation;
  prices: Price;

}
