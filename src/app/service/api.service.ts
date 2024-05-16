import { Volume, LibraryUser, UserToken, UserRegister, VolumeFavorite, SaveRequest } from '../data-types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, catchError, map, of, throwError } from 'rxjs';


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

  public getUserFavorites(){
    return this.httpClient.get<Volume[]>(`http://localhost:8080/volumes/favorite`,
           {headers: new HttpHeaders(
              'Authorization: Bearer ' + this.tokenService.getToken(),
           )});
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
    return this.httpClient.post('http://localhost:8080/auth/register', user, {observe: 'response'})
    .pipe(
      map(response => {
        return response.status;
      }),

      catchError((error: HttpErrorResponse) => {
        return of(error.status);
      }),
    );
  }

  addFavorite(volumeFavorite: VolumeFavorite): Observable<number> {
    return this.httpClient.post('http://localhost:8080/volumes/favorite', volumeFavorite, {headers: new HttpHeaders('Authorization: Bearer ' + this.tokenService.getToken()), observe: 'response'})
    .pipe(
      map(response => {
        return response.status;
      }),

      catchError((error: HttpErrorResponse) => {
        console.log("Add favorite error: ", error.status);
        return of(error.status);
      }),
    );
  }

  removeFavorite(volumeFavorite: VolumeFavorite): Observable<number> {
    return this.httpClient.delete('http://localhost:8080/volumes/favorite', {headers: new HttpHeaders('Authorization: Bearer ' + this.tokenService.getToken()), body: volumeFavorite, observe: 'response'})
    .pipe(
      map(response => {
        return response.status;
      }),

      catchError((error: HttpErrorResponse) => {
        console.log("Remove favorite error: ", error.status);
        return of(error.status);
      }),
    );
  }

  save(saveRequest: SaveRequest): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/volumes', saveRequest, {headers: new HttpHeaders('Authorization: Bearer ' + this.tokenService.getToken()), observe: 'response'})
    .pipe(
      map(response => {
        console.log("response: " + response)
        return response.body;
      }),

      catchError((error: HttpErrorResponse) => {
        console.log("Error to save new Volume")
        return throwError(() => error.error);
      }),
    );
  }


}
