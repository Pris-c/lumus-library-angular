import { TokenService } from './../service/token.service';
import { Volume } from '../data-types';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  showFavorites: boolean = true;
  userFavorites: Volume[] = [];

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
      this.showFavorites = this.tokenService.checkForRoleUser();
      if(this.showFavorites){
        this.getUsersFavorites();
      }
  }

  getUsersFavorites(){
    return this.apiService.getUserFavorites().subscribe((data)=>{
      this.userFavorites = data;
    });
  }
}
