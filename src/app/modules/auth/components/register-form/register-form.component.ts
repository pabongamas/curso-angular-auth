import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '@services/auth.service'
import {RequestStatus} from '@models/request-status.model';

import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  formUser=this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusUser:RequestStatus='init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister=false;
  msgError="";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService:AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      console.log(name, email, password);
      this.authService.registerAndLogin(name,email,password)
      .subscribe({
        next:()=>{
          this.status="success";
          this.router.navigate(["/app/boards"]);
        },
        error:(error)=>{
          const objetoError=error.error;
          this.msgError=error.error.message;
          if(objetoError && objetoError.code==='SQLITE_CONSTRAINT_UNIQUE'){
            this.msgError="Email must be unique!!"
          }
          this.status="failed";
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
  validateUser(){
    if(this.formUser.valid){
      this.statusUser='loading';
      const {email}=this.formUser.getRawValue();
      this.authService.isAvailable(email)
      .subscribe({
        next:(rta)=>{
         if(rta.isAvailable){
          this.showRegister=true;
          this.statusUser="success";
          this.form.controls.email.setValue(email);
         }else{
          this.router.navigate(["/login"], {
            queryParams: { email }
          });

         }
         
        },
        error:(error)=>{
          this.statusUser="failed";
        }
      })
    }else{
      this.formUser.markAllAsTouched();
    }
  }
}
