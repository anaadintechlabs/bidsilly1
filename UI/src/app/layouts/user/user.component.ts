import { ToastrManager } from 'ng6-toastr-notifications';
import { Component, OnInit } from '@angular/core';
import { JwtServiceService } from 'services/jwt-service.service';
import { DataServiceService } from 'services/data-service.service';
import { UserServiceService } from 'services/user-service.service';
import { User } from 'models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
 
  loginStatus:boolean;
  status:boolean;
  user:User;
 
  constructor(private jwtService:JwtServiceService,
    private data: DataServiceService,
    private userService: UserServiceService,
    private router: Router,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.status=false;
    window.scroll(0,0);
    const token = this.getUrlParameter('token');
    const error=this.getUrlParameter('error');
    if(token){
        this.showSuccess('Login Successfull', 'Success!');
        this.jwtService.saveToken(token);
    }

    if(error){
      alert(error);
    }

    this.data.currentStatus.subscribe(isLoggedIn=>{
      this.loginStatus=isLoggedIn;
    });
    this.checkLogin();
  }
  changeclass(){
    if (this.status==false) {
      this.status=true;
    } else {
      this.status=false;
    }
  }
  checkLogin(){
    console.log("JWT TOKEN IS"+this.jwtService.getToken())
    if(this.jwtService.getToken())
      {
        this.data.changeLoginStatusManually(true);
        this.loginStatus=true;
        this.navigateToDashboardBasedonUserType();
        
      }
      else{
        this.loginStatus=false;
      }
  }
  navigateToDashboardBasedonUserType(){
    let userJson=this.userService.getUser();
    this.user=JSON.parse(userJson);
    
    if(this.user.userType=='ADMIN'){
      this.router.navigateByUrl('/admin');
    }
    }

    getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(this.router.url);
      console.log(results);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      };
    
      showSuccess(msg, title) {
        this.toastr.successToastr(msg, 'Success!');
      }
}
