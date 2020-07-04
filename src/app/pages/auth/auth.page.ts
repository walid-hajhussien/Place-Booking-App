import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    public isLoading: boolean;
    public errorMessage: string[];

    constructor(private authService: AuthService, private router: Router, private loadingController: LoadingController) {
        this.isLoading = false;
        this.errorMessage = ['ddd'];
    }

    ngOnInit() {
    }

    onLogin(form: NgForm) {
        console.log(form);
        // note : keyboardClose to close the phone keyboard
        // this.loadingController.create({
        //     message: 'Loading..',
        //     keyboardClose: true,
        //     spinner: 'lines'
        // }).then((loadingREl: HTMLIonLoadingElement) => {
        //     loadingREl.present();
        //     setTimeout(() => {
        //         loadingREl.dismiss();
        //         this.authService.login();
        //         this.router.navigate(['/', 'places']);
        //     }, 2000);
        // });
    }

}
