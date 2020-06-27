import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PlacesPage} from './places.page';


const routes: Routes = [
    {
        path: '',
        component: PlacesPage,
        children: [
            {
                path: 'discover', children: [
                    {path: '', loadChildren: () => import('../discover/discover.module').then(m => m.DiscoverPageModule)},
                    {path: ':placeId', loadChildren: () => import('../place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)}
                ]
            },
            {
                path: 'offers',
                children: [
                    {path: '', loadChildren: () => import('../offers/offers.module').then(m => m.OffersPageModule)},
                    {path: 'new-offer', loadChildren: () => import('../new-offer/new-offer.module').then(m => m.NewOfferPageModule)},
                    {path: 'edit/:id', loadChildren: () => import('../edit-offer/edit-offer.module').then(m => m.EditOfferPageModule)},
                    {
                        path: ':placeId',
                        loadChildren: () => import('../offer-booking/offer-booking.module').then(m => m.OfferBookingPageModule)
                    }
                ]
            },
            {path: '', redirectTo: '/places/discover', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlacesPageRoutingModule {
}
