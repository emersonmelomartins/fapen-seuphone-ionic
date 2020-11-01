import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/LocalUser';
import { UserAuthLogin } from '../models/User';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public storage: StorageService) {

  }

  authenticate(userAuthLogin: UserAuthLogin) {
    return this.http.post<UserAuthLogin>(`http://localhost:8080/api/usuarios/login`, userAuthLogin,
    {
      observe: 'response',
      responseType: 'json'
    }
    );
  }

  successfulLogin(bearerToken: string) {
    let token = bearerToken;
    let user: LocalUser = {
      token,
    }
    
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
