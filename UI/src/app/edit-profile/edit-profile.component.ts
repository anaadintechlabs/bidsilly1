import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AppService } from "app/app.service";
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { DataServiceService } from 'services/data-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private appService: AppService,
    private toastr : ToastrManager,
    private router: Router,
    private data: DataServiceService) { }
 public user:any;
 myFiles:string [] = [];
 urlArray:any=[];
 directUrl:boolean=true;
  ngOnInit() {
    this.getLoggerInUserDetails();
    this.headerText();
  }
    imageUrl = this.appService.BaseUrl+"/downloadFile/";

    showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }

  //One For Profile Picture
  userForm = new FormGroup({  
      id:new FormControl(''),  
      name:new FormControl('',[Validators.required, Validators.maxLength(50),Validators.minLength(2)]),
      email:new FormControl('',[Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
      phoneNumber:new FormControl('',[Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^[6-9]\d{9}$/)]),
      bio:new FormControl('',[Validators.required, Validators.maxLength(50),Validators.minLength(3)]),  
  });
    //Email Will be unique
  getLoggerInUserDetails(){
   
    this.appService.getLoggerInUserDetails().subscribe(data=>{
      this.user=data.user;
      
     this.userForm.patchValue(this.user);
      
     if(this.user.provider=='local')
      {
        this.directUrl=false;
      }
    },error=>{
      console.log('error');
    });
  }


  headerText()
  {
    if(this.router.url=="/home")
    {
      this.data.changeMessage(true);
    }
    else{
      this.data.changeMessage(false);
    }
  }
    onSelectFile(event){
    this.myFiles=[];
   for (var i = 0; i < event.target.files.length; i++) { 
      if(event.target.files[i].size<=2048000)
      {
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[i]); // read file as data url
        
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlArray.push(reader.result);
        }
      }
      else{
        this.showError("Please select image less than 2MB.","Oops!");
      }
  }
  }

  submitForm(){
    if(this.userForm.invalid)
      {
      this.showError("Please Fill all the details","Oops")
      }
    else{

      const categoryData = this.userForm.value;
          const formData = new FormData();
          formData.append('userString', JSON.stringify(categoryData));
          
          for (var i = 0; i < this.myFiles.length; i++) { 
              formData.append("file", this.myFiles[i]);
            }
            
      this.appService.updateUser(formData).subscribe(data=>{
      this.user=data.user;
     this.userForm.patchValue(this.user);
      this.showSuccess("Profile Updated","Success");
      this.urlArray=[];
     if(this.user.provider=='local')
      {
        this.directUrl=false;
      }
    },error=>{
      console.log('error');
    });
    }
  }
  }

