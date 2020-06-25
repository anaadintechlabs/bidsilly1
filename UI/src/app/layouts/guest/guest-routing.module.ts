import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { SignupComponent } from "app/signup/signup.component";
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';

const routes: Routes =[

  //for admin sub module 
//    {
//     path: 'login',
//     component: LoginComponent,
//  },
    //For guest its component and sub module routing
    {
      path:'signup',
      component:SignupComponent,
    },
   
    
];

@NgModule({
   imports: [RouterModule.forChild(routes),
     FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
        ReactiveFormsModule,
      ToastrModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
