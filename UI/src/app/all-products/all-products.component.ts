import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
//CHANGES BY SANCHIT
import { ToastrManager } from 'ng6-toastr-notifications';
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { UserServiceService } from "services/user-service.service";
import { User } from "models/user.model";
import { Router } from '@angular/router';
import { DataServiceService } from 'services/data-service.service';
@Component({
  selector: 'home-allProduct',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  count: any;
  currentUser: User;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  selectedProdId: any;

  public limit=20;
  public offset=1;
  productList:any=[];
  
  loginStatus:boolean;
  reportform:string;
  login:string;

  public action:string;
  public view:string;
  constructor(public toastr: ToastrManager,
    private appService : AppService,
    private userService:UserServiceService,
    private router: Router,
    private data: DataServiceService) { }
 


  //  imageUrl='http://localhost:8080/aclassdeal/api/downloadFile/';
  imageUrl = this.appService.BaseUrl+"/downloadFile/";
   

  reportedAdForm=new FormGroup({

    productId:new FormGroup({
      prodId:new FormControl('')
    }),
    description:new FormControl('',Validators.required),
    comment:new FormControl('',Validators.required)
    
    
  });

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

  
  ngOnInit() {
    this.data.currentStatus.subscribe(login =>{ 
      this.loginStatus = login;
      if(login){
        console.log(login);
        this.login='';
        this.reportform="#reportform";
      }
      else{
        this.login="#loginform";
        this.reportform="#loginform";
      }
    });
    this.getAllProduct();
    this.headerText();
    this.view='block';
  }

getAllProduct()
{
 // console.log('limit',this.limit,'offset',this.offset);
  this.appService.getAllProducts(this.limit,this.offset).subscribe(data=>{
    this.productList=data.productList;
    this.count=data.count;
   
  },error=>{
    console.log('error');
  });
}
loadMoreProducts(){
  this.offset+=1;
  this.limit=this.limit*this.offset;
  this.offset-=1;

  this.getAllProduct();
}
      reportedProduct(prodId){
          
      this.currentUser=this.userService.getCurrentUser();    
      //This logic will be changed
        this.action='list';
      this.selectedProdId=prodId;
      this.reportedAdForm.controls.productId.patchValue({
        prodId:prodId
      });
    }

    reportFormOnSubmit(){
      if(this.reportedAdForm.invalid){
        this.showError("Please Fill all the information","Error");
      }
      else{
        this.appService.reportFormOnSubmit(this.reportedAdForm.value,this.selectedProdId).subscribe(data=>{
          this.showSuccess('Ad has been Reported to admin.', 'Success!');
          this.reportedAdForm.reset();
          this.closeAddExpenseModal.nativeElement.click();
        },error=>{
          console.log(error);
        })
      }

    }


    addToWishlist(prodId){   
        console.log("inside login");
         //This logic will be changed
      if(!this.loginStatus){
        console.log("inside not login");
        // alert("Please login to continue");
        this.login="#loginform";

      }
      else{

        this.appService.addToWishlist(prodId,'').subscribe(data=>{
        if(data.type=='Success'){
        this.showSuccess(data.msg, data.type);
        }
        else{
        this.showError(data.msg,data.type);
          }
       },error=>{
              console.log('error',error);
            });
      }
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
