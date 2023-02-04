import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../../../models/location.model';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {

  @Input() location!: Location;

  pathImg!: string;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    // if (this.location.image) {
    //   this.pathImg = `assets/images/${this.location.image}`;
    // } else { //sets default icon sent by api if no image was found
    //   this.pathImg = `http://openweathermap.org/img/w/${this.location.weather[0].icon}.png`;
    // }
  }

  onClose() {
    this.storageService.removeLocation(this.location);
  }
  
}
