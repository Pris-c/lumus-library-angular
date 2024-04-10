import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LibraryUser, UserToken } from '../data-types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../service/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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


  constructor(private apiService: ApiService, private tokenService: TokenService, private fb: FormBuilder) { }

  ngOnInit(): void {
      this.form;
  }

  login(user: LibraryUser) {
    console.log("Called login")
    this.apiService.login(user).subscribe((data) => {
      this.tokenService.saveToken(JSON.stringify(data.token));
    })
  }

  callLogin(){
    if (this.form.valid) {
      //console.log("Valid form")
      const user: LibraryUser = this.form.value;
      this.login(user);
    }
  }


}

