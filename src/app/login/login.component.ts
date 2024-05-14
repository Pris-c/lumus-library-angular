import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LibraryUser, UserToken } from '../data-types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  failLogin: boolean = false;
  invalidForm: boolean = false;

  token: UserToken = {
    token: ""
  }

  user: LibraryUser = {
    login: "example_login",
    password: "example_password"
  };


  form: FormGroup = this.fb.group({
    login: ['', Validators.required],
    password: ['', [Validators.required]],
  });


  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
      this.failLogin = false;
      this.invalidForm = false;
      this.form;
  }

  login(user: LibraryUser) {
    this.apiService.login(user).subscribe((data) => {
      if (data == null){
        this.failLogin = true;
      }
      else{
        this.tokenService.saveToken(JSON.stringify(data.token));
        this.tokenService.emitRoleData(this.tokenService.checkForRoleUser());
        this.tokenService.emitData(true);
        this.router.navigate([""]);
      }
    })
  }


  callLogin(){
    this.invalidForm = false;
    this.failLogin = false;
    if (this.form.valid) {
      const user: LibraryUser = this.form.value;
      this.login(user);
    } else {
      this.invalidForm = true;
    }
  }


}

