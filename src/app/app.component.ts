import { Component } from '@angular/core';

import { MenuController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;

  isLoggedIn: boolean;
  userLogin: string;
  userInfo: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private authService: AuthService,
    public nav: NavController,
    public menu: MenuController,
  ) {
    this.sideMenu();
    this.initializeApp();

    if(storage.getLocalUser() !== null) {
      this.isLoggedIn = true;
      this.userLogin = storage.getLocalUser().login;

      this.authService.findByLogin(this.userLogin).subscribe(resp => {
        this.userInfo = resp;
      })
    }
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
        title : "Produtos",
        url   : "/products",
        icon  : "phone-portrait-outline"
      },
      {
        title : "Meus Pedidos",
        url   : "/user-orders",
        icon  : "bag-handle-outline"
      },
      {
        title : "Carrinho",
        url   : "/product-cart",
        icon  : "cart-outline"
      },
      {
        title : "Como funciona",
        url   : "/leasing-info",
        icon  : "help-circle-outline"
      },
    ]
  }

  

  logout() {
    this.authService.logout();
    this.nav.navigateForward("home");
    location.reload();
  }

  login() {
    this.nav.navigateForward("login");
    this.menu.close();
  }

  newUser() {
    this.nav.navigateForward("sign-up");
    this.menu.close();
  }

  myInfo() {
    this.nav.navigateForward("user-info");
    this.menu.close();
  }
}
