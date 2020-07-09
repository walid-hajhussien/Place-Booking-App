import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking/booking.service';
import {BookingModel} from '../../models/bookingModel/booking.model';
import {IonItemSliding, LoadingController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
    public bookings: BookingModel[];
    private bookingSub: Subscription;
    public isLoading: boolean;

    constructor(private bookingService: BookingService, private authService: AuthService, private loadingController: LoadingController) {
        this.isLoading = false;
    }

    ngOnInit() {
        this.isLoading = true;
        this.bookingSub = this.bookingService.changeBookingEvent.subscribe((bookings) => {
            if (bookings) {
                console.log(bookings);
                this.bookings = bookings;
                this.isLoading = false;
            }

        });
        this.bookingService.fetchBooking(this.authService.userId).subscribe();
    }

    onDeleteBooking(id: string, itemSliding: IonItemSliding) {
        this.loadingController.create({
            message: 'Deleting...'
        }).then((loadEl) => {
            itemSliding.close();
            loadEl.present();
            this.bookingService.deleteBooking(id).subscribe((res) => {
                loadEl.dismiss();
            });

        })
    }

    ngOnDestroy(): void {
        this.bookingSub.unsubscribe();
    }
}
