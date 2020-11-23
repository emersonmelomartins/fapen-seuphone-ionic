import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  getAddressByZipcode(zipcode) {
    return this.httpClient.get<any>(`http://viacep.com.br/ws/${zipcode}/json`);
  }
}
