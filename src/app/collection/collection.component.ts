import { Volume } from './../volume';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  volumes: Volume[] = [];
  volume: Volume | undefined;

  constructor(
    private apiService: ApiService
    ) { }

   ngOnInit(): void {
    this.apiService.getVolumes().subscribe((data)=>{
      console.log(data);
      this.volumes = data;
      console.log(this.volumes);
    })

  }

}
