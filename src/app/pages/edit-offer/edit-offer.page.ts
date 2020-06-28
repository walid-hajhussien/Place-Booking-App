import {Component, OnInit} from '@angular/core';
import {PlacesService} from '../../services/places/places.service';
import {PlaceModel} from '../../models/placeModel/place.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
    place: PlaceModel;
    placeId: string;

    constructor(private activatedRoute: ActivatedRoute, private navController: NavController, private placesService: PlacesService) {

    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(paramMap => {
            if (!paramMap.has('id')) {
                this.navController.navigateBack('/places/offers');
                return;
            }
            this.placeId = paramMap.get('id');
            this.place = this.placesService.getPlaceById(this.placeId);
            console.log(this.place);
        });
    }

}
