import {Component, OnInit} from '@angular/core';
import {ActionSheetController, LoadingController, ModalController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../services/places/places.service';
import {PlaceModel} from '../../models/placeModel/place.model';
import {BookingModalComponent} from '../../components/booking-modal/booking-modal.component';
import {AuthService} from '../../services/auth/auth.service';
import {BookingService} from '../../services/booking/booking.service';
import {BookingModel} from '../../models/bookingModel/booking.model';
import {delay, take} from 'rxjs/operators';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
    place: PlaceModel;
    placeId: string;

    constructor(
        private navController: NavController,
        private activatedRoute: ActivatedRoute,
        private placesService: PlacesService,
        private modalController: ModalController,
        private actionSheetController: ActionSheetController,
        private authService: AuthService,
        private bookingService: BookingService,
        private loadingController: LoadingController
    ) {
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

    // note : book using modal
    onBook() {
        this.actionSheetController.create({
            header: 'Choose an Action',
            buttons: [
                {
                    text: 'Select Date',
                    handler: () => {
                        this.openBookingModal('select');
                    }
                },
                {
                    text: 'Random Date',
                    handler: () => {
                        this.openBookingModal('random');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        }).then((actionEl: HTMLIonActionSheetElement) => {
            actionEl.present();
        });
    }

    // note: book using
    openBookingModal(mode: 'select' | 'random') {
        this.modalController.create({
            component: BookingModalComponent,
            componentProps: {selectedPlace: this.place, selectedMode: mode}
        }).then(modelEl => {
            modelEl.present();
            return modelEl.onDidDismiss();
        }).then(response => {
            const role = response.role;
            const data = response.data;
            console.log(role, data);
            if (role === 'confirm') {
                const newBooking = new BookingModel(Math.random().toString(), this.place.id, this.authService.userId,
                    // tslint:disable-next-line:max-line-length
                    this.place.title, this.place.imageUrl, data.bookingData.firstName, data.bookingData.lastName, +data.bookingData.guestNumber,
                    data.bookingData.startDate, data.bookingData.endDate);

                this.loadingController.create({message: 'Booking your place...'}).then((loadingEl) => {
                    loadingEl.present();
                    this.bookingService.addBooking(newBooking).pipe(take(1), delay(1000)).subscribe((isAdded) => {
                        loadingEl.dismiss();
                        this.navController.navigateRoot(['/', 'bookings']);
                    });
                });
                console.log('Booked Confirmed', newBooking);
            }

        });

    }
}
