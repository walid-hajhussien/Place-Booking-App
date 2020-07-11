import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {LocationModalComponent} from '../location-modal/location-modal.component';
import {LocationService} from '../../services/location/location.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

    constructor(private modalController: ModalController, private locationService: LocationService) {
    }

    ngOnInit() {
    }

    onPickLocation() {
        this.modalController.create({component: LocationModalComponent}).then((modalEl) => {
            modalEl.onDidDismiss().then((modalData) => {
                console.log(modalData);
                this.locationService.getAddress(modalData.data.lat, modalData.data.lng).subscribe(address => {
                    console.log(address)
                });
            });
            modalEl.present();
        });
    }

}
