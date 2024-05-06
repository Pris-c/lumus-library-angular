import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../data-types';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  failRegister: boolean = false;
  invalidForm: boolean = false;
  conflict: boolean = false;
  badRequest : boolean = false;
  done = false;

  user: UserRegister = {
    name: "example_name",
    login: "example_login",
    password: "example_password"
  };


  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', [Validators.required]]
  });


  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.badRequest = false;
    this.form;
    this.failRegister = false;
    this.invalidForm = false;
    this.done = false;
  }

  callRegister(){
    this.done = false;
    this.conflict = false;
    this.badRequest = false;
    this.invalidForm = false;
    this.failRegister = false;
    if (this.form.valid) {
      const user: UserRegister = this.form.value;
      this.register(user);
    } else {
      this.invalidForm = true;
    }
  }

  register(user: UserRegister) {
    let status = this.apiService.register(user)
    .subscribe( status => {
      switch(status){
        case 0:
            console.log("HttpRequest failed - Register status = 0");
            break;
        case 200:
            this.done = true;
            console.log("Register status = 200");
            break;
        case 403:
          this.conflict = true;
          break
        default:
          this.badRequest = true;
          console.log("Register status = " + status);
      }
    });

  }


}
