import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  observer = new Subject<boolean>();
  public subscribe$ = this.observer.asObservable();

  user = new Subject<boolean>();
  public role$ = this.user.asObservable();

  admin = new Subject<boolean>();
  public admin$ = this.admin.asObservable();

  emitData(data: boolean){
    this.observer.next(data);
  }

  emitRoleData(data: boolean){
    this.user.next(data);
  }

  emitAdminInfo(data: boolean){
    this.admin.next(data);
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

  checkForRoleUser(): any {
    console.log("checking role")
    try {
      const token = this.getToken() as string;
      return jwt_decode.jwtDecode(token).sub?.endsWith("USER");
    } catch(Error) {
      return false;
    }
  }

  checkForRoleAdmin(): any {
    console.log("checking role")
    try {
      const token = this.getToken() as string;
      return jwt_decode.jwtDecode(token).sub?.endsWith("ADMIN");
    } catch(Error) {
      return false;
    }
  }

}
