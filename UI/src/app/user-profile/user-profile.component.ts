import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { User } from 'models/user.model';
import { UserServiceService } from 'services/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  count: any;

    imageUrl = this.appService.BaseUrl+"/downloadFile/";
   limit=6;
  offset=1;
 userList:any=[];
  action:string='block';
  public userId;
  selectedUser:User;
  constructor(private appService:AppService,
    public toastr: ToastrManager,
    private user: UserServiceService) { 
    
  }



  //Show Photo if any
  //Show all basic details(name,email,phone,date of joining)
  //Sign up though (google/fb/aplication)
  //Mobile Enabled
  // Blocked Status if blocked
  //Activate  Status if deactived show message and date 
  //Mobile Number enabled


  //      userForm = new FormGroup({
   
  //     name:new FormControl(''),   
  //     email:new FormControl(''),  
      
  //     phoneNumber : new FormControl(''),
  //     provider:new FormControl(''),
  //     joinDate:new FormControl(''),
  //     enableMobileNumber:new FormControl(''),   
  //     deactivated:new FormControl(''),  
  //      deactivatedMessage:new FormControl(''),  
  //       deactivatedDate:new FormControl(''), 
  //      blocked:new FormControl(''),   
      
      
 
    
  // });

  

  ngOnInit() {
     this.getAllUserDetails();
     this.selectedUser= this.user.getCurrentUser();
     console.log(this.selectedUser);
  }


        showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }
   getAllUserDetails(){
    this.appService.getAllUserDetails(this.limit,this.offset).subscribe(data=>{
      this.count=data.count;
      this.userList=data.userList;
      console.log(this.userList);
    }),error=>{
      console.log(error);
    }
  }

  blockUser(userId){
 this.appService.blockUser(userId).subscribe(data=>{
      this.showSuccess("User has been blocekd","Success");
    }),error=>{
      this.showError("Something went wrong","Error");
    }
  }

  reactivateUser(userId)
  {
     this.appService.reactivateUser(userId).subscribe(data=>{
      this.showSuccess("User has been reactivated,Please Refresh","Success");
    }),error=>{
      this.showError("Something went wrong","Error");
    }
  }

  
    pageChanged(event){
    this.offset=event;
    this.getAllUserDetails();
  }

  showUser(user){
    this.selectedUser=user;
    console.log(this.selectedUser);
  }
}