import {LocationInterface} from './location.interface';

export interface FbUpdatePlacesInterface {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    availableFrom: string;
    availableTo: string;
    userId: string;
    location: LocationInterface;
}