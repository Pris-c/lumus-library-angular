import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  linkedinURL: string = "https://www.linkedin.com/in/priscampos/";
  githubURL: string = "https://github.com/Pris-c";


  constructor() { }

  ngOnInit(): void {
  }

}
