import { Location } from './location.model';

export interface Forecast {
  city: {
    coord: {
      lat: number;
      lon: number;
    }
    country: string;
    id: number;
    name: string;
  },
  list: Location[],
}
