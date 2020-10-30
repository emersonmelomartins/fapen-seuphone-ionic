import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  doLogin() {
    return this.http.get<User>(`http://localhost:8080/api/usuarios/login`);
  }

  createUser() {
    return this.http.get<User>(`http://localhost:8080/api/usuarios/login`);
  }
}
