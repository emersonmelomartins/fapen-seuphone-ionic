import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserAuthLogin } from '../models/User';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})


export class UsersService {

  constructor(private http: HttpClient, public storage: StorageService) { }

  

  createUser(user: User) {
    return this.http.post(`http://localhost:8080/api/usuarios`, user);
  }

  updateAvatar(userInfo) {
    let token = this.storage.getLocalUser().token;
    let headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      "Authorization": "Bearer " + token,
    });

    const [base64Header, base64] = userInfo.base64Image.split(',');
    userInfo.base64Image = base64;
    
    return this.http.post<User>(`http://localhost:8080/api/usuarios/avatarUpdate`, userInfo, { 'headers': headers });
  }
}
