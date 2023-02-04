import { Component } from '@angular/core';
import { StorageService } from '../../../../services/storage.service';
import { WeatherService } from '../../../../services/weather.service';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent {

  zips: string[] = ['10025', '89108', '90210', '84116', '95742', '10001', '33101'];

  constructor(private storageService: StorageService,
              private weatherService: WeatherService) { }

  onClear() {
    this.storageService.clear();
  }

  onLog() {
    this.storageService.log();
  }
  
  onSetZipcode(zipcode: string) {
    this.weatherService.addLocation(zipcode);
  }

}
