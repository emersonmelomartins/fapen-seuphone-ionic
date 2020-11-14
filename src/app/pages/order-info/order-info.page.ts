import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.page.html',
  styleUrls: ['./order-info.page.scss'],
})
export class OrderInfoPage implements OnInit {

  public orderId;
  public order;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.paramMap.subscribe((resp: ParamMap) => {
      this.orderId = resp.get("id");
      this.getOrder(resp.get("id"));
    });
  }

  ngOnInit() {
  }

  getOrder(id) {
    this.orderService.getOrder(id).subscribe(resp => {
      this.order = resp;
    })
  }

}
