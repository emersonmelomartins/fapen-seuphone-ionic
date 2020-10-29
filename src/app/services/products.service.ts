import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getAllProduct() {
    return this.http.get<Product>("http://localhost:8080/api/produtos");
  }

  getProduct(id) {
    return this.http.get<Product>(`http://localhost:8080/api/produtos/${id}`);
  }
}
