import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.page.html',
  styleUrls: ['./user-orders.page.scss'],
})
export class UserOrdersPage {

  public orders: any;

  constructor(private orderService: OrderService, private storage: StorageService, private nav: NavController) {

    
   }

   ionViewWillEnter() {
    if(this.storage.getLocalUser() === null) {
      this.nav.navigateRoot("login");
    } else {
      this.listOrdersByLogin();
    }
   }


  listOrdersByLogin() {
    this.orderService.listOrdersByLogin(this.storage.getLocalUser().login).subscribe(resp => {
      this.orders = resp;
    });
  }

}
