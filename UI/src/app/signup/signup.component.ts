import { response } from './../../models/reesponse.model';
import { Errors } from './../../models/error.model';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { UserServiceService } from './../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  response: response ;
  signUpForm:FormGroup;
  constructor(private fb:FormBuilder,
              private userService:UserServiceService,
              private router:Router
  ) {
    this.signUpForm = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', [Validators.required,Validators.email]],
      'password':['',[Validators.required,Validators.minLength(8)]],
      'name':['dummy']
    });
   }

  ngOnInit() {
  }



  registerUser() {
    const credentials = this.signUpForm.value;
    console.log(credentials);
    this.userService.attempiSignUp(credentials).subscribe(
      data => {
        this.response=data;
        if(this.response.message==="User registered successfully")
        {
          alert("user registered");
          this.router.navigateByUrl('guest/login');
        }
      },
      err => {
        if(err.status===401){
            this.router.navigateByUrl('guest/signup');
        }else{
          alert("Bad Request");
          this.router.navigateByUrl('guest/signup');
        }
      });
    }
}
