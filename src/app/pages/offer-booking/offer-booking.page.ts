import {Component, OnInit} from '@angular/core';
import {PlaceModel} from '../../models/placeModel/place.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {PlacesService} from '../../services/places/places.service';

@Component({
    selector: 'app-offer-booking',
    templateUrl: './offer-booking.page.html',
    styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit {
    place: PlaceModel;
    selectedId: string;

    constructor(private activatedRoute: ActivatedRoute, private navController: NavController, private placesService: PlacesService) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('placeId')) {
                this.navController.navigateBack('/places/offers');
                return;
            }
            this.selectedId = paramMap.get('placeId');
            this.place = this.placesService.getPlaceById(this.selectedId);
            console.log(this.place);

        });
    }

}
