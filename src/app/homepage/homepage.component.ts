import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Volume } from '../data-types';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  topVolumes: Volume[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }


  getTopFavorites(){
    console.log("Get Top Favorites")
    this.apiService.getTopFavorites().subscribe((data) =>{
      this.topVolumes = data;
    })
  }

}
