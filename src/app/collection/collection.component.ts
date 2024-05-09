import { Volume, VolumeFavorite } from './../data-types';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../service/api.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, OnChanges {

  validToken = false;
  volumesDB: Volume[] = [];
  volumes: Volume[] = [];
  volume: Volume | undefined;
  userFavorites: String[] = [];
  @Input() selectedField: string = "";
  @Input() userInput: string = "";

  options = [
    {name: "Title", value: "title"},
    {name: "Author", value:"author"},
    {name: "ISBN", value:"isbn"},
  ]


  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    switch(this.selectedField){
      case "author":
        this.volumes = this.volumesDB.filter((v) =>
                              v.authors.filter((a) => a.includes(this.userInput)));
        break;
    }
  }

  ngOnInit(): void {
    this.loadVolumes();
  }

loadVolumes(){
  this.apiService.getVolumes().subscribe((data)=>{
    this.volumes = this.volumesDB = data;
    console.log(this.volumesDB);
    this.validToken = this.tokenService.isValidToken();
    // Subscribe for future changes
    this.tokenService.subscribe$.subscribe(data => {
      this.validToken = data;
  });

  if(this.validToken){
    this.getUsersFavorites();
  }
})
}

  getUsersFavorites(){
    return this.apiService.getUserFavorites().subscribe((data)=>{
      this.userFavorites = data.map((v) => v.volumeId);
    });
  }

  findBy(){
    switch(this.selectedField){
      case "title":
        this.volumes = this.volumesDB.filter((v) => v.title.toLowerCase().includes(this.userInput.toLowerCase()));
        break;
      case "author":
          this.volumes = this.volumesDB.filter((v) =>
                v.authors.some((a) => a.toLowerCase().includes(this.userInput.toLowerCase())));
          break;
      case "isbn":
        this.volumes = this.volumesDB.filter((v) =>
              v.isbn10.startsWith(this.userInput) || v.isbn13.startsWith(this.userInput));
        break;
      default:
        this.volumes = this.volumesDB;
    }
  }

  addToFavorite(volumeId: string) {
    let volumeFavoriteId : VolumeFavorite = {volumeId: volumeId};
    this.apiService.addFavorite(volumeFavoriteId)
    .subscribe(res => {
      console.log("Favorite status: " + res);
      this.getUsersFavorites();
    });
  }

  removeFavorite(volumeId: string) {
    let volumeFavoriteId : VolumeFavorite = {volumeId: volumeId};
    this.apiService.removeFavorite(volumeFavoriteId)
    .subscribe(res =>{
      console.log("Remove favorite status: " + res);
      this.getUsersFavorites();
    })
  }
}
