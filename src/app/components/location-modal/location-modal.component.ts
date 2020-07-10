import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-location-modal',
    templateUrl: './location-modal.component.html',
    styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent implements OnInit, AfterViewInit {
    @ViewChild('map', {static: true}) mapElementRef: ElementRef;

    constructor(private modalController: ModalController, private renderer2: Renderer2) {
    }

    ngOnInit() {
    }

    onCancel() {
        this.modalController.dismiss();
    }

    ngAfterViewInit(): void {
        this.addGoogleMapsSdk().then((googleMaps) => {
            const mapEl = this.mapElementRef.nativeElement;
            // note : adding the map
            const maps = new googleMaps.Map(mapEl, {
                center: {lat: -34.397, lng: 150.644},
                zoom: 16
            });
            // note: listen to the map once loaded
            googleMaps.event.addListenerOnce(maps, 'idle', () => {
                this.renderer2.addClass(mapEl, 'visible');
            });
        }).catch((error) => {
            console.log('error load the SDK');
        });
    }

    addGoogleMapsSdk(): Promise<any> {
        const win = window as any;
        const googleModule = win.google;
        if (googleModule && googleModule.maps) {
            return Promise.resolve(googleModule.maps);
        }
        return new Promise((resolve, reject) => {
            // note : add map sdk to the dom
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.mapApi}&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            // note : listen to the script until reload
            script.onload = () => {
                const loadGoogleModule = win.google;
                if (loadGoogleModule && loadGoogleModule.maps) {
                    resolve(loadGoogleModule.maps);
                } else {
                    reject('not able to reload map SDK');
                }
            };
        });
    }

}
