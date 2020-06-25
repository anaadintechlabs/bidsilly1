import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { GuestRoutingModule } from "app/layouts/guest/guest-routing.module";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from "app/signup/signup.component";
import { IndexnavbarComponent } from 'app/sharedcomponents/indexnavbar/indexnavbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GuestRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
  SignupComponent]
})
export class GuestModule { }
