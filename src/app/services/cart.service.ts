import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public storage: StorageService, public nav: NavController) { }

  createOrCleanCart(): Cart {
    let cart: Cart = { itens: [] };
    this.storage.setCart(cart);

    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if(cart == null) {
      cart = this.createOrCleanCart();
    }

    return cart;
  }

  addProduct(produto: Product): Cart {
    let cart = this.getCart();

    let position = cart.itens.findIndex(item => item.produto.idProduto == produto.idProduto);

    
    if(position == -1) {
      cart.itens.push({quantidade: 1, produto: produto});
    }
    this.storage.setCart(cart);

    return cart;
  }

  removeProduct(produto: Product): Cart {
    let cart = this.getCart();

    let position = cart.itens.findIndex(item => item.produto.idProduto == produto.idProduto);

    if(position != -1) {
      cart.itens.splice(position, 1);
    }
    this.storage.setCart(cart);

    return cart;
  }

  increaseQuantity(produto: Product): Cart {
    let cart = this.getCart();

    let position = cart.itens.findIndex(item => item.produto.idProduto == produto.idProduto);

    if(position != -1) {
      cart.itens[position].quantidade++;
    }
    this.storage.setCart(cart);

    return cart;
  }

  decreaseQuantity(produto: Product): Cart {
    let cart = this.getCart();

    let position = cart.itens.findIndex(item => item.produto.idProduto == produto.idProduto);

    if(position != -1) {
      cart.itens[position].quantidade--;
      if(cart.itens[position].quantidade < 1) {
        cart = this.removeProduct(produto);
      }
    }
    this.storage.setCart(cart);

    return cart;
  }

  total(): number {
    let cart = this.getCart();

    let sum = 0;

    for(let i = 0; i < cart.itens.length; i++) {
      sum = sum + cart.itens[i].produto.valor * cart.itens[i].quantidade;
    }

    return sum;
  }

  continueShopping() {
    this.nav.navigateRoot("products");
  }
}
