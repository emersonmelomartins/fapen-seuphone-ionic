import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserAuthLogin } from '../models/User';

@Injectable({
  providedIn: 'root'
})


export class UsersService {

  constructor(private http: HttpClient) { }

  

  createUser(user: User) {
    return this.http.post(`http://localhost:8080/api/usuarios`, user);
  }

  getUserInfo({login}: User) {
    return this.http.get<User>(`http://localhost:8080/api/usuarios/${login}`);
  }

  changeAvatar() {
    //do something....
  }
}
