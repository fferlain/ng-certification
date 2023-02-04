export interface Location {
  weather: [
    {
      main: string;
      icon: string;
    }
  ],
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  },
  dt_txt: string;
  name: string;
  zipcode?: string;
  image?: string;
}
