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
 showFavorites = false;


  constructor(
    private tokenService: TokenService,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.validToken = this.tokenService.isValidToken();
    this.showFavorites = this.tokenService.checkForRoleUser();

    // Subscribe for future changes
    this.tokenService.subscribe$.subscribe(data => {
      this.validToken = data;
    });

    this.tokenService.role$.subscribe(data => {
      this.showFavorites = data;
    });
  }

  goToLogin() {
    this.router.navigate(["/login"])
  }

  goToRegister() {
    this.router.navigate(["/register"])
  }

  logout(){
    this.apiService.logout();
    this.validToken = false;
    this.showFavorites = false;
    this.router.navigate([""]);
  }
}
