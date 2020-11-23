import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.page.html',
  styleUrls: ['./order-info.page.scss'],
})
export class OrderInfoPage {

  public orderId;
  public order;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private nav: NavController, private storage: StorageService) { 
    this.activatedRoute.paramMap.subscribe((resp: ParamMap) => {
      this.orderId = resp.get("id");
      this.getOrder(resp.get("id"));
    });
  }

  ionViewWillEnter() {
    if(this.storage.getLocalUser() === null) {
      this.nav.navigateRoot("login");
    }
   }

    formatDate(data) {
    var dia  = data.split("-")[2];
    var mes  = data.split("-")[1];
    var ano  = data.split("-")[0];
  return `${dia}/${mes}/${ano}`;
  }

  getOrder(id) {
    this.orderService.getOrder(id).subscribe(resp => {
      this.order = resp;
      this.order.dtEntregaVenda = this.formatDate(this.order.dtEntregaVenda)
      this.order.dtPedidoVenda = this.formatDate(this.order.dtPedidoVenda)
    })
  }

}
