import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { Cart } from '../models/Cart';
import { LocalUser } from '../models/LocalUser';

@Injectable()
export class StorageService {

  getLocalUser(): LocalUser {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);

    if(user == null) {
      return null;
    } else {
      return JSON.parse(user);
    }
  }

  setLocalUser(obj: LocalUser) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getCart(): Cart {
    let str = localStorage.getItem(STORAGE_KEYS.localCart);

    if(str != null) {
      return JSON.parse(str);
    } else {
      return null;
    }
  }

  setCart(obj: Cart){
    if (obj != null) {
      localStorage.setItem(STORAGE_KEYS.localCart, JSON.stringify(obj));
    } else {
      localStorage.removeItem(STORAGE_KEYS.localCart);
    }
  }

}