import {Injectable} from '@angular/core';
import {BookingModel} from '../../models/bookingModel/booking.model';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private _bookings: BookingModel[];
    private _changeBookingEvent: BehaviorSubject<BookingModel[]>;

    constructor() {
        this._bookings = [];
        this._changeBookingEvent = new BehaviorSubject<BookingModel[]>(this._bookings);
    }

    get bookings() {
        return [...this._bookings];
    }

    get changeBookingEvent(): BehaviorSubject<BookingModel[]> {
        return this._changeBookingEvent;
    }

    addBooking(booking: BookingModel): Observable<boolean> {
        return new Observable((observe) => {
            this._bookings.push(booking);
            this._changeBookingEvent.next(this._bookings);
            observe.next(true);
        });
    }
}
