import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {

  public product: Product;
  public productId: any;
  public imageBase64Code: string;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, public cartService: CartService, public nav: NavController) { 
    this.activatedRoute.paramMap.subscribe((parametro: ParamMap) => {
      this.productId = parametro.get("id");
      this.getProduct(this.productId);
    });
    
  }

  ngOnInit() {
  }

  getProduct(id: number) {
    this.productsService.getProduct(id).subscribe(data => {
      this.product = data;
      this.imageBase64Code = data.fotoEmString;
    })
  }

  addToCart(produto: Product) {
    this.cartService.addProduct(produto);
    this.nav.navigateRoot("product-cart");
  }

}
