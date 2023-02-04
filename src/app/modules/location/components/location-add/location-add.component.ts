import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../../../services/weather.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss']
})
export class LocationAddComponent implements OnInit {
  zipForm!: FormGroup;
  zips: string[] = ['10025', '89108', '90210', '84116', '95742', '10001', '33101'];

  constructor(private weatherService: WeatherService,
              private storageService: StorageService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    const regexUsZipcode = /^\d{5}(?:[-\s]\d{4})?$/;
    this.zipForm = this.formBuilder.group({
      zipcode: ['', [Validators.required, Validators.pattern(regexUsZipcode)]]
    });
  }

  get zipcode() {
    return this.zipForm.get('zipcode');
  }
  
  onSubmit() {
    this.weatherService.addLocation(this.zipForm.get('zipcode')?.value);
  }
  
}
