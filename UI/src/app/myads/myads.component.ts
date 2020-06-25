import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ToastrManager } from 'ng6-toastr-notifications';
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { UserServiceService } from "services/user-service.service";
import { User } from "models/user.model";
import { Router } from '@angular/router';
import { DataServiceService } from 'services/data-service.service';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.scss']
})
export class MyadsComponent implements OnInit {

   currentUser: User;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  selectedProdId: any;

   public limit=15;
  public offset=1;
  productList:any=[];

    loginStatus:boolean;
  reportform:string;
  login:string;

    public action:string;
  public view:string;

    imageUrl = this.appService.BaseUrl+"/downloadFile/";
   

           showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }
  changeView(view:String){
    if (view=='list') {
      this.view='list';
    } 
    if(view=='block'){
      this.view='block';
    }
  }
  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }
  constructor(public toastr: ToastrManager,
    private appService : AppService,
    private userService:UserServiceService,
    private router: Router,
    private data: DataServiceService) { }

  ngOnInit() {
    this.data.currentStatus.subscribe(login => this.loginStatus = login);
    this.getAllPostOfUser();
    this.headerText();
    this.view='block';
  }

loadMoreProducts(){
  this.offset+=1;
  this.limit=this.limit*this.offset;
  this.offset-=1;
  this.getAllPostOfUser();
}

getAllPostOfUser(){
 this.appService.getAllPostOfUser(this.limit,this.offset).subscribe(data=>{
    this.productList=data.productList;
    console.log(this.productList);
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

}
