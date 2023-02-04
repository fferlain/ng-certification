import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Forecast } from '../../../../models/forecast.model';
import { Location } from '../../../../models/location.model';
import { WeatherService } from '../../../../services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  forecast!: Forecast;
  list: Array<Location> = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
    const zipcode = this.route.snapshot.paramMap.get('zipcode');
    if (zipcode) {
      this.weatherService.getForecast(zipcode)
        .subscribe((data: Forecast) => {
          console.log('data', data);
          this.forecast = data;
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  test(fc: Location) {
    console.log(fc);
  }

}
