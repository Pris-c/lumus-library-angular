import { Volume, LibraryUser, UserToken } from '../data-types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  uriFindByTitle: string = "http://localhost:8080/volumes/title/";
  uriLogin: string = "http://localhost:8080/auth/login"

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

/*  public getVolumes(){
    console.log("GET TOKEN: " + this.tokenService.getToken());
    const headerToken = ("Bearer " + this.tokenService.getToken());
    console.log("headerToken: " + headerToken)
    const headers = { 'Authorization': headerToken };
    return this.httpClient.get<Volume[]>(`http://localhost:8080/volumes`, { headers });
  }
*/

  public getVolumes(){
    return this.httpClient.get<Volume[]>(`http://localhost:8080/volumes`);
  }


/*  public getVolumeByTitle(title: string){
    this.uriFindByTitle = this.uriFindByTitle + title;
    return this.httpClient.get<Volume>(this.uriFindByTitle);
  }
*/

  public login(user: LibraryUser){
    return this.httpClient.post<UserToken>(this.uriLogin, user);
  }

  logout() {
    this.tokenService.deleteToken();
  }

}
