import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GuestComponent } from "app/layouts/guest/guest.component";
import { UserComponent } from "app/layouts/user/user.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuardService } from "services/authGuard.service";

const routes: Routes =[
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  //for admin sub module 
   {
    path: 'admin',
    component: AdminLayoutComponent,
    
    canActivateChild:[AuthGuardService],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
    //For guest its component and sub module routing
    {
      path:'guest',
      component:GuestComponent,
      children:[
        {
          path:'',
          loadChildren: './layouts/guest/guest.module#GuestModule'
        }
      ]
    },
    //for normal user submodule
    {
      path:'home',
     
      component:UserComponent,
      
      
      children:[
        {
          path:'',
          loadChildren:'./layouts/user/user.module#UserModule'
        }
      ]
    },    
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
