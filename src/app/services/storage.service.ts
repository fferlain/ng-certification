import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Forecast } from '../models/forecast.model';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private locations$: BehaviorSubject<Location[]> = new BehaviorSubject(new Array<Location>);
  private locations: Location[] = [];

  constructor() {}

  addLocation(location: Location) {
    this.locations.push(location);
    localStorage.setItem('locations', JSON.stringify(this.locations));
  }

  removeLocation(location: Location) {
    const index = this.locations.indexOf(location);
    this.locations.splice(index, 1);
    this.locations$.next(this.locations);
  }

  getLocations(): Observable<Location[]> {
    // gets data from localStorage on page refresh
    const locationsStored = localStorage.getItem('locations');
    if (this.locations.length === 0 && locationsStored) {
      this.locations = JSON.parse(locationsStored);
      this.locations$.next(this.locations);
    }
    return this.locations$;
  }

  addForecast(forecast: Forecast) {
    localStorage.setItem('forecast', JSON.stringify(forecast));
  }

  clear() {
    this.locations = [];
    this.locations$.next(this.locations);
    localStorage.clear();
  }

  log() {
    console.log(this.locations);
    console.log(localStorage);
  }
  
}
