import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  invalidFindForm = false;
  failSave = false;
  newVolume: Volume | undefined;
  defaultMessage = "Contact the support for more information";
  errorMessage: string = this.defaultMessage;
  volumes: Volume[] = [];
  volume: Volume | undefined;
  @Input() selectedField: string = "";
  @Input() userInput: string = "";


  options = [
    {name: "Id", value: "id"},
    {name: "Title", value: "title"},
    {name: "Author", value:"author"},
    {name: "ISBN", value:"isbn"},
  ]


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
    this.errorMessage = this.defaultMessage;
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
        try{
          this.errorMessage = "ERROR: " + error.details;
        }
        catch(error){
          this.errorMessage = "ERROR: Error to save new volume"
        }
      })
    }

    findBy(){
      this.volume = undefined;
      this.volumes = []
      this.invalidFindForm = false;
      console.log("Invalid form");

      if (!this.selectedField || !this.userInput) {
        this.invalidFindForm = true;
      } else {
        switch(this.selectedField){
          case "id":
            this.apiService.findById(this.userInput).subscribe(response =>{
              this.volume = response;
            });
            break;
          case "title":
            this.apiService.findByTitle(this.userInput.toLowerCase()).subscribe(respose =>{
              this.volumes = respose;
            })
            break;
          case "author":
            this.apiService.findByAuthor(this.userInput.toLowerCase()).subscribe(respose =>{
              this.volumes = respose;
            })
            break;
          case "isbn":
            this.apiService.findByIsbn(this.userInput.toLowerCase()).subscribe(respose =>{
              this.volume = respose;
            })
            break;
        }
      }
    }

    delete(volume: Volume){
      console.log("delete volume")
      this.apiService.delete(volume.volumeId).subscribe();
    }
}
