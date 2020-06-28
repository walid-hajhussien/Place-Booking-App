import {Component, OnInit} from '@angular/core';
import {PlacesService} from '../../services/places/places.service';
import {PlaceModel} from '../../models/placeModel/place.model';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
    public places: PlaceModel[];
    public selected: PlaceModel;

    constructor(private placesService: PlacesService, private menuController: MenuController) {
    }

    ngOnInit() {
        this.places = this.placesService.places;
        this.selected = this.places[0];
        console.log(this.places);
    }

    onSelect(place: PlaceModel): void {
        this.selected = place;
    }

    onOpenMenu() {
        this.menuController.toggle('m1');
    }

}
