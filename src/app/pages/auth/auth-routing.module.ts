import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthPage} from './auth.page';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                pathMatch: 'full',
                loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/auth/login'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthPageRoutingModule {
}
