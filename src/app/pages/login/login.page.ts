import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {LoginModel} from '../../models/login/login.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public isLoading: boolean;

    constructor(private authService: AuthService, private router: Router, private loadingController: LoadingController) {
        this.isLoading = false;
    }

    ngOnInit() {
    }

    onLogin(loginForm: NgForm) {
        const loginInfo = new LoginModel(loginForm.value.email, loginForm.value.password);
        // note : keyboardClose to close the phone keyboard
        this.loadingController.create({
            message: 'Loading..',
            keyboardClose: true,
            spinner: 'lines'
        }).then((loadingREl: HTMLIonLoadingElement) => {
            loadingREl.present();
            setTimeout(() => {
                loginForm.reset();
                loadingREl.dismiss();
                this.authService.login();
                this.router.navigate(['/', 'places']);
            }, 2000);
        });
    }

}
