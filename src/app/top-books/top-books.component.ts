import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Volume } from '../data-types';

@Component({
  selector: 'app-top-books',
  templateUrl: './top-books.component.html',
  styleUrls: ['./top-books.component.css']
})
export class TopBooksComponent implements OnInit {
  favorites: Volume[] | undefined

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getTopFavorites().subscribe((data) =>{
      this.favorites = data;
    });


  }

}
