import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking/booking.service';
import {BookingModel} from '../../models/bookingModel/booking.model';
import {IonItemSliding} from '@ionic/angular';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
    public bookings: BookingModel[];

    constructor(private bookingService: BookingService) {
    }

    ngOnInit() {
        this.bookings = this.bookingService.bookings;
    }

    onDeleteBooking(id: string, itemSliding: IonItemSliding) {
        itemSliding.close();
    }

}
