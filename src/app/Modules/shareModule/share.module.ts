import {NgModule} from '@angular/core';
import {LocationComponent} from '../../components/location/location.component';
import {LocationModalComponent} from '../../components/location-modal/location-modal.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports:[CommonModule],
    declarations: [LocationComponent, LocationModalComponent],
    exports:[LocationComponent, LocationModalComponent]
})
export class ShareModule {

}