import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationListComponent } from './modules/location/components/location-list/location-list.component';
import { ForecastComponent } from './modules/location/components/forecast/forecast.component';

const routes: Routes = [
  { path: '', component: LocationListComponent },
  { path: 'forecast/:zipcode', component: ForecastComponent },
  { path:'**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
