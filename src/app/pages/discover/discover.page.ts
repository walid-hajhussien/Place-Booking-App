import {Component, OnInit, ViewChild} from '@angular/core';
import {PlacesService} from '../../services/places/places.service';
import {PlaceModel} from '../../models/placeModel/place.model';
import {IonInfiniteScroll, IonVirtualScroll, MenuController} from '@ionic/angular';
import * as faker from 'faker';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
    public places: PlaceModel[];
    public selected: PlaceModel;
    public type: 'infinite-scroll' | 'virtual-scroll' | 'infinite-scroll&virtual-scroll';

    constructor(private placesService: PlacesService, private menuController: MenuController) {
        this.type = 'virtual-scroll';
    }

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

    ngOnInit() {
        this.places = this.placesService.places;
        this.selected = this.places[0];
        if (this.type === 'virtual-scroll') {
            this.getPlaces();
        }
    }

    getPlaces() {
        for (let i = 0; i < 20; i++) {
            this.places.push(new PlaceModel(
                faker.address.zipCode(),
                faker.name.firstName(),
                faker.company.catchPhraseDescriptor(),
                faker.image.city(),
                10
            ));
        }
    }

    onSelect(place: PlaceModel): void {
        this.selected = place;
    }

    onOpenMenu() {
        this.menuController.toggle('m1');
    }

    loadData(event) {

        // Using settimeout to simulate api call
        setTimeout(() => {

            // load more data
            this.getPlaces()

            // Hide Infinite List Loader on Complete
            event.target.complete();

            if (this.type === 'infinite-scroll&virtual-scroll') {
                // Rerender Virtual Scroll List After Adding New Data
                this.virtualScroll.checkEnd();
            }

            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (this.places.length > 40) {
                console.log(this.places)
                event.target.disabled = true;
            }
        }, 500);
    }


}
