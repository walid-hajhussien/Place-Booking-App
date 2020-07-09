import {Injectable} from '@angular/core';
import {BookingModel} from '../../models/bookingModel/booking.model';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private _bookings: BookingModel[];
    private _changeBookingEvent: BehaviorSubject<BookingModel[]>;

    constructor(private httpClient: HttpClient) {
        this._bookings = [];
        this._changeBookingEvent = new BehaviorSubject<BookingModel[]>(undefined);
    }

    get bookings() {
        return [...this._bookings];
    }

    get changeBookingEvent(): BehaviorSubject<BookingModel[]> {
        return this._changeBookingEvent;
    }

    addBooking(booking: BookingModel): Observable<{ name: string }> {
        return this.httpClient.post<{ name: string }>(environment.firebaseAddBookingUrl, {
            ...booking,
            id: null
        }).pipe(tap((res) => {
            this._bookings.push({...booking, id: res.name});
            this._changeBookingEvent.next([...this._bookings]);
        }));
    }

    fetchBooking(userId: string): Observable<BookingModel[]> {
        return this.httpClient.get<FbFetchBookingInterface>(`${environment.firebaseAddBookingUrl}?orderBy="userId"&equalTo="${userId}"`)
            .pipe(map(response => {
                console.log(response)
                if (!response) {
                    this._bookings = [];
                    this._changeBookingEvent.next([...this._bookings]);
                    return this._bookings;
                }
                const fetchbookings: BookingModel[] = [];
                for (const k of Object.keys(response)) {
                    const fbbooking = response[k];
                    const booking = new BookingModel(
                        k, fbbooking.placeId, fbbooking.userId, fbbooking.placeTitle, fbbooking.placeImage,
                        fbbooking.firstName, fbbooking.lastName, +fbbooking.guestNumber, new Date(fbbooking.bookedFrom),
                        new Date(fbbooking.bookedTo)
                    );
                    fetchbookings.push(booking);
                }
                this._bookings = fetchbookings;
                this._changeBookingEvent.next([...this._bookings]);
                return fetchbookings;
            }));
    }

    deleteBooking(id: string): Observable<boolean> {
        return this.httpClient.delete(`${environment.firebaseBooking}${id}.json`).pipe(map((res) => {
            console.log(res);
            this._bookings = this._bookings.filter((booking) => {
                return booking.id !== id;
            });
            this._changeBookingEvent.next(this._bookings);
            return true;
        }));

    }
}
