import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private httpClient: HttpClient) {
    }

    getAddress(lat: number, lng: number): Observable<any> {
        // note:  you should enable billing
        // return this.httpClient
        // .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleApiKey}`)
        //     .pipe(map(geoData => {
        //         console.log(geoData);
        //         return geoData;
        //     }));

        // note: mocha data
        return this.httpClient.get<any>('/assets/Data/address.json')
            .pipe(map(geoData => {
                return geoData.results[0].formatted_address;
            }));
    }
}
