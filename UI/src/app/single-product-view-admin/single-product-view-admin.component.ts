import { Component, OnInit } from '@angular/core';
import { User } from "models/user.model";

import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AppService } from "app/app.service";
import { UserServiceService } from "services/user-service.service";
import { DataServiceService } from "services/data-service.service";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-single-product-view-admin',
  templateUrl: './single-product-view-admin.component.html',
  styleUrls: ['./single-product-view-admin.component.scss']
})
export class SingleProductViewAdminComponent implements OnInit {

  attributeMap: any;
 currentUser: User;
 action:any;
 public limit:number=25;
  public offset:number=1;
  bidsOnProductList:any=[];
  intrestOnProductList:any=[];
imageUrl = this.appService.BaseUrl+'/downloadFile/'
public prodID;
public reportedId;
productCreatedDate:Date;
 loginStatus:boolean;
endDate:"June 20 2019";
productView:object;
 bidModel:string;
   productIdList = new Map();
  approvedProductList: any = [];
    approved='APPROVED';
  deleted='DELETED';
  constructor(public toastr: ToastrManager,private activateRoute:ActivatedRoute,private router:Router,private appService: AppService,private userService:UserServiceService,private data: DataServiceService){
    this.prodID=this.activateRoute.snapshot.queryParams['ID'] || 'NO ID';
    this.action=this.activateRoute.snapshot.queryParams['action'];
    this.reportedId=this.activateRoute.snapshot.queryParams['reportId'];
   }


     closedDealForm=new FormGroup({
      productModel:new FormGroup({
        prodId:new FormControl('')
      }),
  
   message:new FormControl('')   
   
  })
  

  text:any = {
  
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "Hours",
    Minutes: "Minutes",
    Seconds: "Seconds",
    MilliSeconds: "MilliSeconds"
  };
  

       showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

    openClosedDeal(prodId){
   
    this.closedDealForm.controls.productModel.patchValue({
        prodId:prodId
      });
    }


  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }

  // ngOnInit() {

  //   this.data.currentStatus.subscribe(login => this.loginStatus = login);
  //   this.data.currentStatus.subscribe(login =>{
  //     this.loginStatus = login;
  //     if(login){
  //       this.bidModel='#bidModel';
  //     }
  //     else{
  //       this.bidModel='#loginform';
  //     }
  //   });
  //   this.appService.getAllDetailsOfProductById(this.prodID).subscribe(data=>{     
  //   this.productView=data.product;
  
  //   this.attributeMap=data.attributes;;
  //    if(this.productView['bid'] && this.action=='myads'){
  //       this.appService.getAllBidsOfProduct(this.limit,this.offset,this.productView['prodId']).subscribe(data=>{
  //         this.bidsOnProductList=data.bidList;
  //       },error=>{
  //         console.log('error');
  //       })

  //   }
  //   },error=>{
  //   console.log('error');
  //   });
  //   this.headerText();
  // }



   ngOnInit() {
    window.scroll(0,0);
    this.data.currentStatus.subscribe(login => this.loginStatus = login);
    this.data.currentStatus.subscribe(login =>{
      this.loginStatus = login;
      if(login){
        this.bidModel='#bidModel';
       // this.reportform="#reportform";
      }
      else{
        this.bidModel='#loginform';
      //  this.reportform="#loginform";
      }
    });
    this.appService.getAllDetailsOfProductById(this.prodID).subscribe(data=>{     
    this.productView=data.product;
    this.attributeMap=data.attributes;
      //Now from backkend all bids  or intrest are coming
      if(data && data.bidList)
        {
          //If myads/seller then show all 15 bids
      if(this.action=='myads')
        {
       //   this.showOtherBidDetails=true;
      this.bidsOnProductList=data.bidList;
      console.log(this.bidsOnProductList);
        }
    //If not then show last 5 bids
        else 
          {
          //  this.showOtherBidDetails=false;
    this.bidsOnProductList=data.bidList;
    console.log(this.bidsOnProductList);
    this.bidsOnProductList=this.bidsOnProductList.slice(0,5);
          }
        }

      if(data && data.interestList)
        {
          //If myads/seller then show all 15 intrest
      if(this.action=='myads')
        {
      this.intrestOnProductList=data.interestList;
        }
    //If not then show last 5 intrest
        else 
          {
    this.intrestOnProductList=data.interestList;
          }
        }

      
    },error=>{
    console.log('error');
    });
    this.headerText();
  }


changeStatusToClose(event){
  console.log('reached'+event);
}

  addToWishlist(prodId){   
      this.currentUser=this.userService.getCurrentUser();
     
      //This logic will be changed
      if(!Object.keys(this.currentUser).length){
        alert("Please login to continue");
      }
      else{
      this.appService.addToWishlist(prodId,this.currentUser.userId).subscribe(data=>{
        if(data.type=='Success'){
        this.showSuccess(data.msg, data.type);
        }
      else{
        this.showError(data.msg,data.type);
      }
            },error=>{
              console.log('error',error);
            })
    }
    }

   
    approveProductByid(productId) {
    this.productIdList.set(productId, productId);
    this.approvedProductList = Array.from(this.productIdList.keys());
    this.appService.approveOrBlockProducts(this.approvedProductList,this.approved).subscribe(data => {
      this.showSuccess('Product Approved', 'Success!');
      this.router.navigateByUrl("admin/allProducts");
    }, error => {
      console.log('error');
    });
  }


  deleteNewProductById(reportedId){
    this.productIdList.set(reportedId, reportedId);
    this.approvedProductList = Array.from(this.productIdList.keys());
    this.appService.approveOrBlockProducts(this.approvedProductList,this.deleted).subscribe(data => {
      this.showSuccess('Product(s) Deleted', 'Success!');
       this.router.navigateByUrl("admin/allProducts");
    }, error => {
      console.log('error');
    });
  }
  
  deleteReportedProduct(){
    this.appService.blockAdd(this.reportedId).subscribe(data=>{
this.showSuccess('Ad has been removed.', 'Success!');
this.router.navigateByUrl("admin/reportedads");
    },error=>{
      console.log('error',error);
    })
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


        closedDealFormOnSubmit(){
 if(this.closedDealForm.invalid)
      {
        this.showError("Please fill value","Warning");
      }
      else{
       
         this.appService.closedDealFormOnSubmit(this.closedDealForm.value).subscribe(data=>{
          this.showSuccess("Product marked as sold","Success");
         // this.closeAddExpenseModal.nativeElement.click();
          window.location.reload();
          
        },error=>{
         this.showError(error.message,"Warning")
        });
       }
      //  this.closeAddExpenseModal.nativeElement.click();
    }
	
}
