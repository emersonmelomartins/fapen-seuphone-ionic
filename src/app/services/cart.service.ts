import { Injectable } from '@angular/core';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public storage: StorageService) { }

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
}
