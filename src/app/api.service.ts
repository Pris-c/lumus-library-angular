import { Volume } from './volume';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uriFindByTitle: string = "http://localhost:8080/volumes/title/";

  constructor(private httpClient: HttpClient) { }

  public getVolumes(){
    return this.httpClient.get<Volume[]>(`http://localhost:8080/volumes`);
  }


  public getVolumeByTitle(title: string){
    this.uriFindByTitle = this.uriFindByTitle + title;
    return this.httpClient.get<Volume>(this.uriFindByTitle);
  }

}
