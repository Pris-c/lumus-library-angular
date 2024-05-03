import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  validToken = false;


  constructor(
    private tokenService: TokenService,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.validToken = this.tokenService.isValidToken();

    // Subscribe for future changes
    this.tokenService.subscribe$.subscribe(data => {
      this.validToken = data;
    });
  }

  goToLogin() {
    this.router.navigate(["/login"])
  }

    goToSignin() {
    this.router.navigate(["/signin"])
  }

  logout(){
    console.log("Called logout")
    this.apiService.logout();
    this.validToken = false;
    this.router.navigate([""]);
  }

}
