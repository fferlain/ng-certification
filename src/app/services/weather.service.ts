import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, switchMap, take, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Coordinate } from '../models/coordinate.model';
import { Location } from '../models/location.model';
import { Forecast } from '../models/forecast.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private readonly APP_ID = '5a4b2d457ecbef9eb2a71e480b947604';
  private readonly URL_COORDINATES = 'http://api.openweathermap.org/geo/1.0/zip';
  private readonly URL_LOCATION = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';
  private readonly URL_BASE = 'https://api.openweathermap.org/data/2.5';
  private readonly iconsAdapter = [
    { picture: 'sun.png', codes: ['01d', '01n'] },
    { picture: 'clouds.png', codes: ['02d', '02n', '03d', '03n', '04d', '04n'] },
    { picture: 'rain.png', codes: ['09d', '09n', '10d', '10n', '11d', '11n'] },
    { picture: 'snow.png', codes: ['13d', '13n', '50d', '50n'] }
  ];
  locations$ = new Subject();
  
  constructor(private httpClient: HttpClient,
              private storageService: StorageService) { }

  private getIcon(codeIcon: string): string {
    const icon = this.iconsAdapter.filter(item => item.codes.includes(codeIcon));
    return icon[0]?.picture;
  }

  private getCoordinates(zipcode: string) {
    return this.httpClient.get<Coordinate>(`${this.URL_COORDINATES}?zip=${zipcode}&appid=${this.APP_ID}`);
  }

  private getLocationData(coordinates: Coordinate): Observable<Location> {
    const url = `${this.URL_LOCATION}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APP_ID}&units=metric`;
    return this.httpClient.get<Location>(url).pipe(take(1));
  }

  private getForecastData(coordinates: Coordinate) {
    const url = `${this.URL_FORECAST}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APP_ID}&units=metric`;
    return this.httpClient.get<Forecast>(url).pipe(take(1));
  }

  addLocation(zipcode: string) {
    this.getCoordinates(zipcode)
      .pipe(
        switchMap((coord: Coordinate) => this.getLocationData(coord)),
        tap(location => location.image = this.getIcon(location.weather[0].icon)),
        tap(location => location.zipcode = zipcode),
        tap(location => this.storageService.addLocation(location)),
        take<Location>(1)
      )
      .subscribe();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // const params = new HttpParams();
    // params.set('zip', zipcode + ',us');
    // params.set('appid', this.APP_ID);
    // return this.httpClient.get<Forecast>(`${this.URL_BASE}/forecast?zip=${zipcode}&appid=${this.APP_ID}`).pipe(take(1));
    return this.getCoordinates(zipcode)
      .pipe(
        switchMap((coord: Coordinate) => this.getForecastData(coord)),
        tap(forecast => forecast.list = this.get5days(forecast.list)),
        tap(forecast => forecast.list.forEach(location => location.image = this.getIcon(location.weather[0].icon))),
        tap(forecast => this.storageService.addForecast(forecast)),
        take<Forecast>(1)
      );
  }

  private get5days(forecastList: Location[]) {
    const list: Location[] = [];
    forecastList.forEach((item, i) => {
      if (i % 8 === 0) {
        list.push(item);
      }
    });
    return list;
  }

  // getForecast2(coord: Coordinate) {
  //   const forecast = this.getForecastData(coord).pipe(
  //     tap((forecast: Forecast) => this.storageService.addForecast(forecast)),
  //     take<Forecast>(1)
  //   );
  //   localStorage.setItem('forecast', JSON.stringify(forecast));
  //   return forecast;
  // }

}
