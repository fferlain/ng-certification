import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../../services/storage.service';
import { Location } from '../../../../models/location.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  locations$: Observable<Location[]> = new Observable<Location[]>;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.locations$ = this.storageService.getLocations();
  }

}
