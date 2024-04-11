import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  observer = new Subject<boolean>();
  public subscribe$ = this.observer.asObservable();

  emitData(data: boolean){
    console.log("emitData");
    this.observer.next(data);
  }

  constructor() { }
  saveToken(token: string) {
    token = token.substring(1, token.length-1);
    sessionStorage.setItem('token', token);
  }

  deleteToken() {
    sessionStorage.clear()
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isValidToken(){
    return this.getToken() != null;
  }

}
