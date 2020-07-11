import {LocationInterface} from './location.interface';

export interface FbFetchPlacesInterface {
    [id: string]: {
        title: string,
        description: string,
        imageUrl: string,
        price: number,
        availableFrom: string,
        availableTo: string,
        userId: string,
        location: LocationInterface
    };
}
