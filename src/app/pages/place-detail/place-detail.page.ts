import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../services/places/places.service';
import {PlaceModel} from '../../models/placeModel/place.model';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
    place: PlaceModel;
    placeId: string;

    constructor(private navController: NavController, private activatedRoute: ActivatedRoute, private placesService: PlacesService) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this.navController.navigateBack('/places/discover');
                return;
            }
            this.placeId = paramMap.get('placeId');
            this.place = this.placesService.getPlaceById(this.placeId);
            console.log(this.place);
        });
    }

    onBook() {
        this.navController.navigateBack(['/', 'places', 'discover']);
        // note: using pop
        // this.navController.pop();

    }
}
