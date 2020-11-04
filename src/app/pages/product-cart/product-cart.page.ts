import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { STORAGE_KEYS } from 'src/app/config/storage_keys.config';
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.page.html',
  styleUrls: ['./product-cart.page.scss'],
})
export class ProductCartPage {

  public itens: CartItem[];

  constructor(public cartService: CartService, public nav: NavController) { }

  ionViewDidEnter() {
    let cart = this.cartService.getCart();

    this.itens = cart.itens;
  }


  removeProduct(produto: Product) {
    this.itens = this.cartService.removeProduct(produto).itens;
  }

  increaseQuantity(produto: Product) {
    this.itens = this.cartService.increaseQuantity(produto).itens;
  }

  decreaseQuantity(produto: Product) {
    this.itens = this.cartService.decreaseQuantity(produto).itens;
  }

  total(): number {
    return this.cartService.total();
  }

  continueShopping() {
    this.cartService.continueShopping();
  }

}
