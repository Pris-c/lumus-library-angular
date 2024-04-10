import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  saveToken(token: string) {
    token = token.substring(1, token.length-1);
    sessionStorage.setItem('token', token);
  }

  deleteToken(token: string) {
    sessionStorage.clear()
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

}
