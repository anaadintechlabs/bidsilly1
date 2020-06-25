import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from "app/app.service";
import { UserServiceService } from "services/user-service.service";
import { User } from "models/user.model";
import { DataServiceService } from "services/data-service.service";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  toggleChecked: boolean;
  user:User;
  // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,30})/)
   public changePasswordForm=new FormGroup({
     oldPassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
    newPassword: new FormControl('', [Validators.required,,Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });


   public deactivateForm=new FormGroup({
     description: new FormControl('', [Validators.required,Validators.minLength(6)]),
     userId:new FormControl('')
  });
  
  constructor(public toastr: ToastrManager, private appService : AppService,private userService:UserServiceService,private data : DataServiceService,) { }

        showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }

  ngOnInit() {
   this.user= JSON.parse(this.userService.getUser());
   
    this.toggleChecked=this.user.enableMobileNumber;
  }
  //Set toggleChecked to previous eneblevalue
   changeSlider(event) {
    this.toggleChecked = !this.toggleChecked;
    //Here need to update in local storage as well as backend
    this.appService.enableDisablePhoneNumber(this.toggleChecked,this.user.id).subscribe(data=>{
      
      this.showSuccess("Settings saved successfully, Login again to see the effects","Success");
    },error=>{
      this.showError("something went wrong","Error");
    })
  }


  deactivateAndLogOut()
  {
    //alert(JSON.stringify(this.user));
    if(this.user!=undefined)
      {
        this.deactivateForm.patchValue({
         userId :this.user.id
        });
        this.appService.deactivateAndLogOut(this.deactivateForm.value).subscribe(data=>{
    //Logout here  
   // alert(JSON.stringify(data));
    if(data && data.deactivated)
      {
        this.logOutUser();
      }
    },error=>{
      this.showError("something went wrong","Error");
    })
      }

  }

  logOutUser(){
  this.userService.logout();
  //RELOAD HERE
  this.data.changeLoginStatusManually(false);
  //
  window.location.reload();
  this.showSuccess("You have been logged out.", "Success");
}
  onSubmit(){
    if (this.changePasswordForm.invalid) {
    this.showError("Please enter all the details","Error");
    }
    else{
     if(this.changePasswordForm.controls.confirmPassword.value==this.changePasswordForm.controls.newPassword.value){
        this.appService.setNewPassword(this.changePasswordForm.value,this.user.id).subscribe(data=>{
           this.showSuccess("New Password Set Successfully,","Success");
           this.changePasswordForm.reset();
        },error=>{
          this.showError(error.message, 'Error!');
        } )
        
      }
      else{
        this.showError("Password does not matched","error");
      }
    }
  }
}

