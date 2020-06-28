import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PlaceDetailPageRoutingModule} from './place-detail-routing.module';

import {PlaceDetailPage} from './place-detail.page';
import {BookingModalComponent} from '../../components/booking-modal/booking-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlaceDetailPageRoutingModule
    ],
    declarations: [PlaceDetailPage, BookingModalComponent]
})
export class PlaceDetailPageModule {
}
