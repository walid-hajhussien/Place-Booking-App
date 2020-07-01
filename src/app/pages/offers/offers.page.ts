import {Component, OnInit} from '@angular/core';
import {PlaceModel} from '../../models/placeModel/place.model';
import {PlacesService} from '../../services/places/places.service';
import {Router} from '@angular/router';
import {IonItemSliding, NavController} from '@ionic/angular';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
    offerPlaces: PlaceModel[];

    constructor(private placesService: PlacesService, private router: Router, private navController: NavController) {
        this.offerPlaces = this.placesService.places;
    }

    ngOnInit() {
    }

    onEdit(id: string, itemSliding: IonItemSliding) {
        itemSliding.close();
        // note: we use navController to apply the animation
        this.navController.navigateForward(['/', 'places', 'offers', 'edit', id]);
    }

}
