import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.page.html',
  styleUrls: ['./confirm-order.page.scss'],
})
export class ConfirmOrderPage {

  public itens: CartItem[];

  constructor(public cartService: CartService, public nav: NavController) {
   }

  ionViewDidEnter() {
    
    let cart = this.cartService.getCart();

    this.itens = cart.itens;

    this.cartService.checkCart(cart);
    
  }

  total(): number {
    return this.cartService.total();
  }

  goBack() {
    this.nav.back();
    }
}
