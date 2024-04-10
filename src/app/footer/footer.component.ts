import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
goToLink(arg0: { "": any; }) {
throw new Error('Method not implemented.');
}
  linkedinURL: string = "https://www.linkedin.com/in/priscampos/";
  githubURL: string = "https://github.com/Pris-c";


  constructor() { }


  ngOnInit(): void {
  }

}
