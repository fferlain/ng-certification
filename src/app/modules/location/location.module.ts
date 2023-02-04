import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LocationAddComponent } from './components/location-add/location-add.component';
import { LocationItemComponent } from './components/location-item/location-item.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { HelperComponent } from './components/helper/helper.component';
import { ForecastComponent } from './components/forecast/forecast.component';


@NgModule({
  declarations: [
    LocationAddComponent,
    LocationItemComponent,
    LocationListComponent,
    ForecastComponent,
    HelperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class LocationModule { }
