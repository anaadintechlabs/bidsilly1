import { UserServiceService } from './user-service.service';
import { Observable } from 'rxjs/internal/Observable';

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';

import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { DataServiceService } from "services/data-service.service";
import { CanActivateChild } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivateChild{


 loginStatus:boolean;
 public user:any;

  constructor(
    private router: Router,
    private userService: UserServiceService
    ,private data: DataServiceService
  ) { 

    //this.data.currentStatus.subscribe(login => this.loginStatus = login);
     //this.user= JSON.parse(this.userService.getUser());
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    this.user=this.userService.getUser();
   //  this.user= JSON.parse(this.userService.getUser());
     //alert("auth"+JSON.stringify(this.user));

     if(this.user!=undefined){
    if(!Object.keys(this.user).length){

         this.router.navigateByUrl("/home");
      }
        else
          {
            this.user= JSON.parse(this.userService.getUser())
            //alert(this.user.userType)
            if(this.user.userType!='ADMIN')
              {
                this.router.navigateByUrl("/home");
              }
          }
     }
    else{

       this.router.navigateByUrl("/home");
    }
    //
return true;
   // return this.userService.isAuthenticated.pipe(take(1));

  }
}
