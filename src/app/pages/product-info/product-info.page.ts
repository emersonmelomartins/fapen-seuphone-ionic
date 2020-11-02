import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/Product';
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

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { 
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

}
