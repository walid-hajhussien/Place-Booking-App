export interface FbFetchBookingInterface {
    [id: string]: {
        bookedFrom: string,
        bookedTo: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        placeId: string,
        placeImage: string,
        placeTitle: string,
        userId: string,
    };

}