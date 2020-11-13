import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, public storage: StorageService) { }

  createOrder(order) {
    let token = this.storage.getLocalUser().token;
    let headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      "Authorization": "Bearer " + token,
    });


    
    return this.http.post(`http://localhost:8080/api/pedidos`, order, { 'headers': headers });
  }
}
