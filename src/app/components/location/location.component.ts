import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {LocationModalComponent} from '../location-modal/location-modal.component';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    onPickLocation() {
        this.modalController.create({component: LocationModalComponent}).then((modalEl) => {
            modalEl.present();
        });
    }

}
