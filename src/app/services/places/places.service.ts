import {Injectable} from '@angular/core';
import {PlaceModel} from '../../models/placeModel/place.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {delay, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private placesChangeBehavior: BehaviorSubject<PlaceModel[]>;
    private _places: PlaceModel[];

    constructor(private httpClient: HttpClient) {
        this._places = [];
        this.placesChangeBehavior = new BehaviorSubject<PlaceModel[]>(undefined);
    }

    get places(): PlaceModel[] {
        return [...this._places];
    }

    set places(places: PlaceModel[]) {
        this._places = places;
    }

    get changePlacesEvent() {
        return this.placesChangeBehavior.asObservable();
    }

    getPlaceById(id: string): PlaceModel {
        return this._places.find(value => {
            return value.id === id;
        });
    }

    addPlace(place: PlaceModel): Observable<{ name: string }> {
        // note : the Id will be add from firebase
        return this.httpClient.post<{ name: string }>(environment.firebasePlaces, place)
            .pipe(tap((response) => {
                place.id = response.name;
                this._places.push(place);
                this.placesChangeBehavior.next([...this._places]);
                console.log('firbase', response);
            }));
    }

    updatePlace(newPlace: PlaceModel): Observable<boolean> {
        return new Observable((observe) => {
            this._places = this._places.map((place) => {
                return (newPlace.id === place.id) ? newPlace : place;
            });
            this.placesChangeBehavior.next([...this._places]);
            observe.next(true);
        });
    }

    fetchPlaces(): Observable<PlaceModel[]> {
        return this.httpClient.get<FbPlacesInterface>(environment.firebasePlaces).pipe(map((response) => {
            console.log(response)
            if (!response) {
                this._places = [];
                this.placesChangeBehavior.next([...this._places]);
                return this._places;
            }
            const fetchPlaces: PlaceModel[] = [];
            for (const k of Object.keys(response)) {
                const fbPlace = response[k];
                const place = new PlaceModel(
                    fbPlace.title,
                    fbPlace.description,
                    fbPlace.imageUrl,
                    fbPlace.price,
                    new Date(fbPlace.availableFrom),
                    new Date(fbPlace.availableTo),
                    fbPlace.userId,
                    k
                );
                fetchPlaces.push(place);
            }
            this._places = fetchPlaces;
            this.placesChangeBehavior.next([...this._places]);
            return fetchPlaces;
        }));
    }
}
