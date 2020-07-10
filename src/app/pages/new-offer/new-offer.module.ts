import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NewOfferPageRoutingModule} from './new-offer-routing.module';

import {NewOfferPage} from './new-offer.page';
import {ShareModule} from '../../Modules/shareModule/share.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        NewOfferPageRoutingModule,
        ShareModule
    ],
    declarations: [NewOfferPage]
})
export class NewOfferPageModule {
}
