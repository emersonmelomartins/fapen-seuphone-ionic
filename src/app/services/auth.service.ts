import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalUser } from '../models/LocalUser';
import { UserAuthLogin } from '../models/User';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public jwtHelper: JwtHelperService = new JwtHelperService();


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
      login: this.jwtHelper.decodeToken(token).sub,
    }

    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }

  findByLogin(login: string) {
    let token = this.storage.getLocalUser().token;
    let headers = new HttpHeaders({"Authorization": "Bearer " + token});

    return this.http.get(`http://localhost:8080/api/usuarios/${login}`,
     { 'headers': headers }
    );
  }
}
