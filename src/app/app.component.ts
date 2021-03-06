import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./services/auth/auth.service";
import { Router } from "@angular/router";
import { PlacesService } from "./services/places/places.service";
import { Plugins, Capacitor } from "@capacitor/core";
import { BookingService } from "./services/booking/booking.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private placesService: PlacesService
  ) {
    this.initializeApp();
    this.placesService.fetchPlaces().subscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable("SplashScreen")) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/", "auth"]);
  }
}
