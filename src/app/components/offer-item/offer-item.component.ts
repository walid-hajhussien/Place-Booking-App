import {Component, Input, OnInit} from '@angular/core';
import {PlaceModel} from '../../models/placeModel/place.model';

@Component({
    selector: 'app-offer-item',
    templateUrl: './offer-item.component.html',
    styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {

    @Input() offer: PlaceModel;

    constructor() {
    }

    ngOnInit() {
    }

    getDate(): Date {
        return new Date();
    }

}
