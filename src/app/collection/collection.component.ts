import { Volume } from '../data-types';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, OnChanges {
  volumesDB: Volume[] = [];
  volumes: Volume[] = [];
  volume: Volume | undefined;
  @Input() selectedField: string = "";
  @Input() userInput: string = "";

  options = [
    {name: "Title", value: "title"},
    {name: "Author", value:"author"},
    {name: "ISBN", value:"isbn"},
  ]


  constructor(private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("finding by...");
    console.log(this.selectedField);
    switch(this.selectedField){
      case "author":
        this.volumes = this.volumesDB.filter((v) =>
                              v.authors.filter((a) => a.includes(this.userInput)));
        break;
    }
  }

  ngOnInit(): void {
  this.apiService.getVolumes().subscribe((data)=>{
    console.log(data);
    this.volumes = this.volumesDB = data;
    console.log(this.volumesDB);
  })}


  public findBy(){
    console.log("finding by...");
    console.log(this.selectedField);
    console.log(this.userInput);
    switch(this.selectedField){
      case "title":
        this.volumes = this.volumesDB.filter((v) => v.title.toLowerCase().includes(this.userInput.toLowerCase()));
        break;
      case "author":
          this.volumes = this.volumesDB.filter((v) =>
                v.authors.some((a) => a.toLowerCase().includes(this.userInput.toLowerCase())));
          break;
      case "isbn":
        if(this.userInput.length == 10 || this.userInput.length == 13){
        this.volumes = this.volumesDB.filter((v) =>
              v.isbn10 == this.userInput || v.isbn13 == this.userInput);
        } else{
          this.volumes = this.volumesDB;
        }
        break;
      default:
        this.volumes = this.volumesDB;
    }

  }

}
