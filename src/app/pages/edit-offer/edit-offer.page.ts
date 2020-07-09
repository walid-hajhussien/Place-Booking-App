import {Component, OnInit} from '@angular/core';
import {PlacesService} from '../../services/places/places.service';
import {PlaceModel} from '../../models/placeModel/place.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {delay, map, take} from 'rxjs/operators';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
    editOfferForm: FormGroup;
    place: PlaceModel;
    placeId: string;
    isLoading: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private navController: NavController,
                private placesService: PlacesService,
                private loadingController: LoadingController) {
        this.isLoading = false;

    }

    ngOnInit() {
        this.isLoading = true;
        this.activatedRoute.paramMap.pipe(map((paramMap: ParamMap) => {
            if (!paramMap.has('id')) {
                this.isLoading = false;
                this.navController.navigateBack('/places/offers');
                return;
            }
            this.placeId = paramMap.get('id');

            // this.place = this.placesService.getPlaceById(this.placeId);
            return this.placeId;
        })).subscribe((id: string) => {
            this.placesService.getPlaceByIdOnline(this.placeId).subscribe((place) => {
                this.place = place;
                this.editOfferForm = new FormGroup({
                    title: new FormControl(this.place.title, {
                        updateOn: 'blur',
                        validators: [Validators.required]
                    }),
                    description: new FormControl(this.place.description, {
                        updateOn: 'blur',
                        validators: [Validators.required, Validators.maxLength(180)]
                    }),
                    price: new FormControl(this.place.price, {
                        updateOn: 'blur',
                        validators: [Validators.required, Validators.min(1)]
                    }),
                    dateFrom: new FormControl({value: this.place.availableFrom.toISOString(), disabled: true}, {
                        updateOn: 'blur',
                        validators: [Validators.required]
                    }),
                    dateTo: new FormControl({value: this.place.availableTo.toISOString(), disabled: true}, {
                        updateOn: 'blur',
                        validators: [Validators.required]
                    })
                });
                this.isLoading = false;
            });
        });
    }

    onEditPlace() {
        const newPlace: PlaceModel = {...this.place};
        newPlace.title = this.editOfferForm.value.title;
        newPlace.description = this.editOfferForm.value.description;
        newPlace.price = this.editOfferForm.value.price;
        this.loadingController.create({
            message: 'Updating The Place...'
        }).then((loadingEl) => {
            loadingEl.present();
            this.placesService.updatePlace(newPlace).pipe(take(1)).subscribe((response) => {
                loadingEl.dismiss();
                this.navController.navigateBack(['/', 'places', 'offers']);
            });
        });

    }

}
