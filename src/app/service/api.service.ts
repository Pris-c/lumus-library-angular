import { Volume, LibraryUser, UserToken, UserRegister } from '../data-types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, catchError, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  uriFindByTitle: string = "http://localhost:8080/volumes/title/";
  uriLogin: string = "http://localhost:8080/auth/login"

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  public getVolumes(){
    return this.httpClient.get<Volume[]>(`http://localhost:8080/volumes`);
  }


  public login(user: LibraryUser): Observable<UserToken | null>{

    return this.httpClient.post<UserToken>(this.uriLogin, user).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Invalid login:', error);
        return of (null);
      })
    );
  }

  logout() {
    this.tokenService.deleteToken();
  }

  register(user: UserRegister): Observable<number> {
    console.log("Service register called");
    // let status : number = 0;

    return this.httpClient.post('http://localhost:8080/auth/register', user, {observe: 'response'})
    .pipe(
      map(response => {
        console.log("Response: " + response);
        console.log("Status: " + response.status);
        return response.status;
      }),

      catchError((error: HttpErrorResponse) => {
        console.log("Error status: ", error.status);
        return of(error.status);
      }),
    );
  }

}
