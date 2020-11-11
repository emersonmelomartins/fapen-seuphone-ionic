import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { ProductsService } from "./products.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  public estoque: any;

  constructor(
    public storage: StorageService,
    public nav: NavController,
    public productsService: ProductsService
  ) {}

  createOrCleanCart(): Cart {
    let cart: Cart = { itens: [] };
    this.storage.setCart(cart);

    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if (cart == null) {
      cart = this.createOrCleanCart();
    }

    return cart;
  }

  async checkStock(id) {
    return new Promise((resolve, reject) => {
      this.productsService.checkStock(id).subscribe((resp) => {
        this.estoque = resp;
        resolve();
        return resp;
      });
    });
  }

  async checkCart(cart: Cart) {
    if (cart.itens.length > 0) {
      for (let i = 0; i < cart.itens.length; i++) {
        await this.checkStock(cart.itens[i].produto.idProduto);

        if (!this.estoque.temEstoque) {
          let position = cart.itens.findIndex(
            (item) => item.produto.idProduto == cart.itens[i].produto.idProduto
          );

          // Ajustar para tirar do carrinho todos os itens sem estoque.
          if (position != -1) {
            cart.itens.splice(position, 1);
          }

          alert(
            "Um produto do seu carrinho foi removido por falta de estoque."
            );
          }
          this.storage.setCart(cart);
        }
    }
  }

  addProduct(produto: Product): Cart {
    let cart = this.getCart();

    let position = cart.itens.findIndex(
      (item) => item.produto.idProduto == produto.idProduto
    );

    if (position == -1) {
      cart.itens.push({ quantidade: 1, produto: produto });
    }
    this.storage.setCart(cart);

    return cart;
  }

  removeProduct(produto: Product): Cart {
    let cart = this.getCart();

    let position = cart.itens.findIndex(
      (item) => item.produto.idProduto == produto.idProduto
    );

    if (position != -1) {
      cart.itens.splice(position, 1);
    }
    this.storage.setCart(cart);

    return cart;
  }

  async increaseQuantity(produto: Product): Promise<Cart> {
    let cart = this.getCart();

    let position = cart.itens.findIndex(
      (item) => item.produto.idProduto == produto.idProduto
    );

    if (position != -1) {
      await this.checkStock(cart.itens[position].produto.idProduto);

      if (
        this.estoque !== undefined &&
        cart.itens[position].quantidade < this.estoque.quantidade_estoque
      ) {
        cart.itens[position].quantidade++;
      } else {
        alert("Você atingiu o limite de estoque disponível.");
      }
    }
    this.storage.setCart(cart);

    return cart;
  }

  decreaseQuantity(produto: Product): Cart {
    let cart = this.getCart();

    let position = cart.itens.findIndex(
      (item) => item.produto.idProduto == produto.idProduto
    );

    if (position != -1) {
      cart.itens[position].quantidade--;
      if (cart.itens[position].quantidade < 1) {
        cart = this.removeProduct(produto);
      }
    }
    this.storage.setCart(cart);

    return cart;
  }

  total(): number {
    let cart = this.getCart();

    let sum: number = 0;

    for (let i = 0; i < cart.itens.length; i++) {
      sum = sum + Number(cart.itens[i].produto.valor) * Number(cart.itens[i].quantidade);
    }

    return Number(sum.toFixed(2));
  }

  continueShopping() {
    this.nav.navigateRoot("products");
  }
}
