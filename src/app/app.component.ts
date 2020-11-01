import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;

  isLoggedIn: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private authService: AuthService,
    public nav: NavController,
  ) {
    this.sideMenu();
    this.initializeApp();
    this.isLoggedIn = storage.getLocalUser() !== null ? true : false;
    console.log('app.component', this.isLoggedIn);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Login",
        url   : "/login",
        icon  : "person-outline"
      },
      {
        title : "Produtos",
        url   : "/products",
        icon  : "phone-portrait-outline"
      },
      {
        title : "Produto Especifico",
        url   : "/product-info/1",
        icon  : "phone-portrait-outline"
      },
    ]
  }

  logout() {
    this.authService.logout();
    this.nav.navigateForward("home");
    location.reload();
  }
}
