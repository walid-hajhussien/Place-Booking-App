import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {LocationModalComponent} from '../location-modal/location-modal.component';
import {LocationService} from '../../services/location/location.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LocationInterface} from '../../interfaces/location.interface';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
    private pickLocation: LocationInterface;
    @Output() locationPick = new EventEmitter<LocationInterface>();

    constructor(private modalController: ModalController, private locationService: LocationService) {
    }

    ngOnInit() {
    }

    onPickLocation() {
        this.modalController.create({component: LocationModalComponent}).then((modalEl) => {
            modalEl.onDidDismiss().then((modalData) => {
                if (modalData.role === 'cancel') {
                    return;
                }
                this.pickLocation = {
                    lat: modalData.data.lat,
                    lng: modalData.data.lng,
                    address: null,
                    staticMapImageUrl: null
                };
                this.locationService.getAddress(this.pickLocation.lat, this.pickLocation.lng).pipe(switchMap(address => {
                    this.pickLocation.address = address;
                    return of(this.locationService.getMapImageUrl(this.pickLocation.lat, this.pickLocation.lng, 14));
                })).subscribe(imageMapUrl => {
                    this.pickLocation.staticMapImageUrl = imageMapUrl;
                    this.locationPick.emit(this.pickLocation);
                });
            });
            modalEl.present();
        });
    }

    onChangeMap() {
        this.onPickLocation();
    }

}
