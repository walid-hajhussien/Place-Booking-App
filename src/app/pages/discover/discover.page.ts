import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PlacesService} from '../../services/places/places.service';
import {PlaceModel} from '../../models/placeModel/place.model';
import {IonInfiniteScroll, IonVirtualScroll, MenuController} from '@ionic/angular';
import * as faker from 'faker';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';


@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
    private placeChangeEvent: Subscription;
    public places: PlaceModel[];
    public selected: PlaceModel;
    public type: 'infinite-scroll' | 'virtual-scroll' | 'infinite-scroll&virtual-scroll';
    public filterType: 'all' | 'bookable';
    public userId: string;
    public isLoading: boolean;


    constructor(private placesService: PlacesService, private menuController: MenuController, private authService: AuthService) {
        this.type = 'infinite-scroll&virtual-scroll';
        this.filterType = 'all';
        this.userId = this.authService.userId;
        this.isLoading = true;
    }

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

    ngOnInit() {
        // note : add event
        this.placeChangeEvent = this.placesService.changePlacesEvent.pipe().subscribe((places) => {
            if (!places) {
                this.isLoading = true;
            } else {
                this.isLoading = false;
                this.places = places;
                this.selected = (places.length > 0) ? places[0] : undefined;
            }
        });
    }

    ionViewWillEnter() {

    }

    getPlaces() {
        if (this.filterType === 'all') {
            for (let i = 0; i < 20; i++) {
                this.places.push(new PlaceModel(
                    faker.name.firstName(),
                    faker.company.catchPhraseDescriptor(),
                    faker.image.city(),
                    10,
                    new Date('2020-01-01'),
                    new Date('2020-12-31'),
                    faker.company.suffixes,
                    faker.address.zipCode()
                ));
            }
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

    onSegmentChange(event: any) {
        switch (event.detail.value) {
            case 'all':
                this.places = this.placesService.places;
                this.selected = this.places[0];
                this.filterType = 'all';
                break;
            case 'bookable':
                this.filterType = 'bookable';
                this.places = this.places.filter((place) => {
                    return place.userId === this.userId;
                });
                this.selected = (this.places.length > 0) ? this.places[0] : undefined;
                break;
            default:
                this.places = this.placesService.places;
                this.selected = this.places[0];
                this.filterType = 'all';
                break;
        }
    }

    doRefresh(event) {
        this.placesService.fetchPlaces().subscribe((places) => {
            this.places = places;
            event.target.complete();
        });
    }

    ngOnDestroy(): void {
        this.placeChangeEvent.unsubscribe();
    }

}
