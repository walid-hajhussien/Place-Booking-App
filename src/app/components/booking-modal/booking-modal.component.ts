import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PlaceModel} from '../../models/placeModel/place.model';
import {ModalController} from '@ionic/angular';
import {FormGroup, NgForm} from '@angular/forms';

@Component({
    selector: 'app-booking-modal',
    templateUrl: './booking-modal.component.html',
    styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent implements OnInit {

    @Input() selectedPlace: PlaceModel;
    @Input() selectedMode: 'selected' | 'random';
    @ViewChild('bookForm', {static: true}) bookForm: NgForm;
    public startDate: string;
    public endDate: string;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        const availableFrom = this.selectedPlace.availableFrom;
        const availableTo = this.selectedPlace.availableTo;
        if (this.selectedMode === 'random') {
            const startDateMillisecond = availableFrom.getTime() + Math.random() *
                (availableTo.getTime() - (7 * 24 * 60 * 60 * 1000) - availableFrom.getTime());
            this.startDate = new Date(startDateMillisecond).toISOString();
            const endDateMillisecond = new Date(this.startDate).getTime() + (Math.random() * (6 * 24 * 60 * 60 * 1000));
            this.endDate = new Date(endDateMillisecond).toISOString();
        }
    }

    onCancel() {
        this.modalController.dismiss(null, 'cancel');
    }

    onBookPlace(form: NgForm) {
        this.modalController.dismiss({
            bookingData: {
                firstName: form.value['first-name'],
                lastName: form.value['last-name'],
                guestNumber: form.value['guests-number'],
                startDate: form.value['date-from'],
                endDate: form.value['date-to']
            }
        }, 'confirm');
    }

    checkValidDate() {
        return new Date(this.bookForm.value['date-from']) < new Date(this.bookForm.form.value['date-to']);
    }


}
