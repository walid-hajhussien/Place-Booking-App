import {NgModule} from '@angular/core';
import {LocationComponent} from '../../components/location/location.component';
import {LocationModalComponent} from '../../components/location-modal/location-modal.component';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [LocationComponent, LocationModalComponent],
    exports:[LocationComponent, LocationModalComponent]
})
export class ShareModule {

}