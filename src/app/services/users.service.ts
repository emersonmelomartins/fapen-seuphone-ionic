import { FormCadastro } from './../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserAuthLogin } from '../models/User';
import { StorageService } from './storage.service';
import { RecoverPassword } from '../models/RecoverPassword';

@Injectable({
  providedIn: 'root'
})


export class UsersService {

  public token = this.storage.getLocalUser() !== null ? this.storage.getLocalUser().token : null;
  public headers = new HttpHeaders({
    "Access-Control-Allow-Origin": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "Authorization": "Bearer " + this.token,
  });

  constructor(private http: HttpClient, public storage: StorageService) { }


  createUser(form: FormCadastro) {
    return this.http.post(`http://localhost:8080/api/usuarios/criarUsuario`, form);
  }

  updateAvatar(userInfo) {


    const [base64Header, base64] = userInfo.base64Image.split(',');
    userInfo.base64Image = base64;
    
    return this.http.post<User>(`http://localhost:8080/api/usuarios/avatarUpdate`, userInfo, { 'headers': this.headers });
  }

  recoverPassword(email) {
    return this.http.post<RecoverPassword>(`http://localhost:8080/api/esqueci-senha`, email);
  }

  updateAddress(user) {
    return this.http.put<User>(`http://localhost:8080/api/usuarios/addressUpdate`, user, { 'headers': this.headers });
  }
}
