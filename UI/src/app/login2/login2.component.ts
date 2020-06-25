import { UserServiceService } from './../../services/user-service.service';

import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Errors } from 'models/error.model';
import { Router } from '@angular/router';
import { response } from 'models/reesponse.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { DataServiceService } from 'services/data-service.service';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../constants/index';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  showLoginForm:boolean=true;
  showRegistrationForm:boolean=false;

  response: response ;
  signUpForm:FormGroup;

  authType: String = '';
  authForm: FormGroup;
  isSubmitting = false;
  errors: Errors = {errors: {}};

  google_url:string;
  facebook_url:string;
  github_url:string;
  constructor(private fb: FormBuilder,
    private userService:UserServiceService,
    private router:Router,public toastr: ToastrManager,
    private data : DataServiceService
) { 
  this.google_url=GOOGLE_AUTH_URL;
  this.facebook_url=FACEBOOK_AUTH_URL;
  this.github_url=GITHUB_AUTH_URL;
this.authForm = this.fb.group({
'email': ['', Validators.required],
'password': ['', Validators.required]
});
this.signUpForm = this.fb.group({
'username': ['', Validators.required],
'email': ['', [Validators.required,Validators.email]],
'password':['',[Validators.required,Validators.minLength(6)]],
'name':['',Validators.required]
});
}


  ngOnInit() {
  }

        showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }


  changeForm(formStatus:string){
    if(formStatus=='Login'){
      this.showLoginForm=true;
      this.showRegistrationForm=false;
    }
    if(formStatus=='Resistration'){
      this.showRegistrationForm=true;
      this.showLoginForm=false;
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      data => {
        this.showSuccess('Login Successfull', 'Success!');
        if(data.userType=='ADMIN'){
          this.data.changeloginStatus(true);
          this.router.navigateByUrl('/admin');
        }
        else{
          this.data.changeloginStatus(true);
          // this.router.navigateByUrl('/home');
        }
              
     },
      err => {
        console.log(err);
        this.errors = err;
        this.isSubmitting = false;
        if(err.status===401){
            // this.router.navigateByUrl('guest/signup');
            this.toastr.errorToastr('Invalid email and password');
        }
          if(err.status==400)
            {
          this.toastr.errorToastr(err.message); 
            }
      }
    );
          this.closeAddExpenseModal.nativeElement.click();
  }

  registerUser() {
    const credentials = this.signUpForm.value;
    console.log(credentials);
    this.userService.attempiSignUp(credentials).subscribe(
      data => {
        this.response=data;
       
        // if(this.response.message==="User registered successfully")
        // {
          this.showSuccess('User registered successfully, Please login using the user ID and password.', 'Success!');
          setTimeout(() => {
            window.location.reload();           
          }, 200);
          // this.router.navigateByUrl('guest/login');
       // }
      },
      err => {
        if(err.status===401){
            // this.router.navigateByUrl('guest/signup');
            this.toastr.errorToastr('Please Fill Correct Detail');
        }else{
          // alert("Bad Request");
          this.toastr.errorToastr("Something went wrong");
        }
      });
      this.closeAddExpenseModal.nativeElement.click();
    }
  


}
