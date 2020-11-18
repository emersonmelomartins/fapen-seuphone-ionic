import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
})
export class OrderSuccessPage{

  constructor(private nav: NavController, private storage: StorageService) { }

  ionViewWillEnter() {
    if(this.storage.getLocalUser() === null) {
      this.nav.navigateRoot("login");
    }
   }

}
