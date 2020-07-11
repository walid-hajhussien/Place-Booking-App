import {LocationInterface} from '../../interfaces/location.interface';

export class PlaceModel {
    constructor(
        public title: string,
        public description: string,
        public imageUrl: string,
        public price: number,
        public availableFrom: Date,
        public availableTo: Date,
        public userId: string,
        public location: LocationInterface,
        public id?: string,
    ) {
    }
}
