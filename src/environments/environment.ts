// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseAddPlacesUrl: 'https://booking-app-f44c9.firebaseio.com/places.json',
    firebaseUpdatePlacesUrl: 'https://booking-app-f44c9.firebaseio.com/places/',
    firebaseAddBookingUrl: 'https://booking-app-f44c9.firebaseio.com/booking.json',
    firebaseBooking: 'https://booking-app-f44c9.firebaseio.com/booking/,',
    googleApiKey: 'AIzaSyC5FGTZ8PWsSzfNLqwlBDuOqxx6QPKXxMg',
    geocodingApi: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
