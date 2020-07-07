interface FbPlacesInterface {
    [id: string]: {
        title: string,
        description: string,
        imageUrl: string,
        price: number,
        availableFrom: string,
        availableTo: string,
        userId: string,
    };
}
