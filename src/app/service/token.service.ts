import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  observer = new Subject<boolean>();
  public subscribe$ = this.observer.asObservable();

  role = new Subject<boolean>();
  public role$ = this.role.asObservable();

  admin = new Subject<boolean>();
  public admin$ = this.admin.asObservable();

  emitData(data: boolean){
    console.log("emitData");
    this.observer.next(data);
  }

  emitRoleData(data: boolean){
    console.log("emitRoleData");
    this.role.next(data);
  }

  emitAdminInfo(data: boolean){
    console.log("emitAdminData");
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
    console.log("checking user role")
    try {
      const token = this.getToken() as string;
      console.log("token sub: " + jwt_decode.jwtDecode(token).sub);
      return jwt_decode.jwtDecode(token).sub?.endsWith("USER");
    } catch(Error) {
      return false;
    }
  }

  checkForRoleAdmin(): any {
    console.log("checking admin role")
    try {
      const token = this.getToken() as string;
      console.log("token sub: " + jwt_decode.jwtDecode(token).sub);
      return jwt_decode.jwtDecode(token).sub?.endsWith("ADMIN");
    } catch(Error) {
      return false;
    }
  }

}
