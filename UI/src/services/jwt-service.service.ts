import { Injectable } from '@angular/core';
import { User } from 'models/user.model';

@Injectable()
export class JwtServiceService {

  constructor() { }

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
