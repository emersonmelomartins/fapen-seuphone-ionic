import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.page.html',
  styleUrls: ['./user-orders.page.scss'],
})
export class UserOrdersPage implements OnInit {

  public orders: any;

  constructor(private orderService: OrderService, private storage: StorageService) {
    this.listOrdersByLogin();
   }

  ngOnInit() {
  }

  listOrdersByLogin() {
    this.orderService.listOrdersByLogin(this.storage.getLocalUser().login).subscribe(resp => {
      this.orders = resp;
    })
  }

}
