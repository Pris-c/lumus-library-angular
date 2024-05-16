import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaveRequest, Volume } from '../data-types';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin = false;
  invalidForm = false;
  failSave = false;
  newVolume: Volume | undefined;
  errorMessage: string | undefined;


  constructor(
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.newVolume = undefined;
    this.admin = this.tokenService.checkForRoleAdmin();
      if(!this.admin){
        this.router.navigate(["/error-page"]);
      }
  }

  form: FormGroup = this.fb.group({
    isbn: ['', Validators.required],
  });


  callSave(){
    this.newVolume = undefined;
    this.invalidForm = false;
    this.failSave = false;
    this.errorMessage = undefined;
    if (this.form.valid) {
      const saveRequest: SaveRequest = this.form.value;
      this.save(saveRequest);
    } else {
      this.invalidForm = true;
    }
  }


  save(saveRequest: SaveRequest) {
    this.apiService.save(saveRequest).subscribe(
      (response) => {
        if (response == null){
          this.failSave = true;
        } else {
          this.newVolume = response;
        }
      },
      (error) => {
        if (error.detais != null){
          this.errorMessage = "ERROR: " + error.details;
        } else{
          this.errorMessage = "ERROR: Error to save new volume"
        }
      }
  )
  }




}
