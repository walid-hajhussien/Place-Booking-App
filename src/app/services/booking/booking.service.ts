import {Injectable} from '@angular/core';
import {BookingModel} from "../../models/bookingModel/booking.model";

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private _Bookings: BookingModel[];

    constructor() {
        this._Bookings = [
            {
                id: 'b1',
                placeId: 'j1',
                userId: 'u1',
                placeTitle: 'Zarqa',
                guestNumber: 2
            }
        ];
    }

    get bookings() {
        return [...this._Bookings];
    }
}
