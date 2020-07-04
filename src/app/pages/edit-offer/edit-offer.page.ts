import {Component, OnInit} from '@angular/core';
import {PlacesService} from '../../services/places/places.service';
import {PlaceModel} from '../../models/placeModel/place.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NavController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
    editOfferForm: FormGroup;
    place: PlaceModel;
    placeId: string;

    constructor(private activatedRoute: ActivatedRoute, private navController: NavController, private placesService: PlacesService) {

    }

    ngOnInit() {
        this.activatedRoute.paramMap.pipe(map((paramMap: ParamMap) => {
            if (!paramMap.has('id')) {
                this.navController.navigateBack('/places/offers');
                return;
            }
            this.placeId = paramMap.get('id');
            this.place = this.placesService.getPlaceById(this.placeId);
            return this.placeId;
        })).subscribe((id: string) => {
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
            });
        });
    }

    onEditPlace() {
        console.log('Edited');
    }

}
