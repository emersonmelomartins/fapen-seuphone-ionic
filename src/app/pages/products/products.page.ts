import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  public products: Product;

  public imageBase64Code: string;

  constructor(private productsService: ProductsService) {
    this.getAllProducts();
  }

  ngOnInit() {
  }

  getAllProducts() {
    this.productsService.getAllProduct().subscribe((data) => {
      this.products = data;
    })
  }

}
