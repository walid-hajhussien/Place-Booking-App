import {Component, Input, OnInit} from '@angular/core';
import {PlaceModel} from '../../models/placeModel/place.model';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-booking-modal',
    templateUrl: './booking-modal.component.html',
    styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent implements OnInit {

    @Input() selectedPlace: PlaceModel;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    onCancel() {
        this.modalController.dismiss(null, 'cancel');
    }

    onBook() {
        this.modalController.dismiss({message: 'data back '}, 'confirm');
    }

}
