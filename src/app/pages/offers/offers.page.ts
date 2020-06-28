import { Component, OnInit } from '@angular/core';
import {PlaceModel} from '../../models/placeModel/place.model';
import {PlacesService} from '../../services/places/places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offerPlaces: PlaceModel[];

  constructor(private placesService: PlacesService) {
    this.offerPlaces = this.placesService.places;
  }

  ngOnInit() {
  }

}
