import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { UserServiceService } from "services/user-service.service";
import { DataServiceService } from "services/data-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements  CanActivate {

  loginStatus:boolean;
 public user:any;

  constructor(
    private router: Router,
    private userService: UserServiceService
    ,private data: DataServiceService
  ) { 

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    this.user=this.userService.getUser();
     if(this.user!=undefined){
    if(!Object.keys(this.user).length){
         this.router.navigateByUrl("/home");
      }
        else
          {
            this.user= JSON.parse(this.userService.getUser())
            //alert(this.user.userType)
            if(this.user.userType!='USER')
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

  }

}
