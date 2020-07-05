import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking/booking.service';
import {BookingModel} from '../../models/bookingModel/booking.model';
import {IonItemSliding} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
    public bookings: BookingModel[];
    private bookingSub: Subscription;

    constructor(private bookingService: BookingService) {
    }

    ngOnInit() {
        this.bookingSub = this.bookingService.changeBookingEvent.subscribe((bookings) => {
            this.bookings = bookings;
        });
    }

    onDeleteBooking(id: string, itemSliding: IonItemSliding) {
        itemSliding.close();
    }

    ngOnDestroy(): void {
        this.bookingSub.unsubscribe();
    }
}
