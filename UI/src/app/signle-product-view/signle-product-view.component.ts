import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatePipe } from '@angular/common';
import { User } from "models/user.model";
import { UserServiceService } from "services/user-service.service";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { DataServiceService } from "services/data-service.service";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
  selector: 'app-signle-product-view',
  templateUrl: './signle-product-view.component.html',
  styleUrls: ['./signle-product-view.component.scss']
})
export class SignleProductViewComponent implements OnInit {
  showOtherBidDetails: boolean=false;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
 
    selectedProdId: any;
  attributeMap: any;
 currentUser: User;
public limit:number=25;
  public offset:number=1;
 action:any;
 bidsOnProductList:any=[];
 intrestOnProductList:any=[];
imageUrl = this.appService.BaseUrl+'/downloadFile/'
public prodID;
productCreatedDate:Date;
 loginStatus:boolean;
endDate:"June 20 2019";
productView:object;
 bidModel:string;
 reportform:string;
 intrestModel:string;
  constructor(public toastr: ToastrManager,private activateRoute:ActivatedRoute,private router:Router,private appService: AppService,private userService:UserServiceService,private data: DataServiceService){
    this.prodID=this.activateRoute.snapshot.queryParams['ID'] || 'NO ID';
    this.action=this.activateRoute.snapshot.queryParams['action'];
   
  }

   bidForm=new FormGroup({
      product:new FormGroup({
        prodId:new FormControl('')
      }),
   bidAmount:new FormControl(''),
   comment:new FormControl('')   
   
  })



   intrestForm=new FormGroup({
      product:new FormGroup({
        prodId:new FormControl('')
      }),
      profileNumber:new FormControl(''),
      phoneNumber:new FormControl(''),

      //comment:new FormControl('')   
   
  })

  
  closedDealForm=new FormGroup({
      productModel:new FormGroup({
        prodId:new FormControl('')
      }),
  
   message:new FormControl('')   
   
  })

  reportedAdForm=new FormGroup({

    productId:new FormGroup({
      prodId:new FormControl('')
    }),
    description:new FormControl('',Validators.required),
    comment:new FormControl('',Validators.required)
    
    
  });

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

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }

  //PREVIOUS NGONINIT
  // ngOnInit() {
  //   window.scroll(0,0);
  //   this.data.currentStatus.subscribe(login => this.loginStatus = login);
  //   this.data.currentStatus.subscribe(login =>{
  //     this.loginStatus = login;
  //     if(login){
  //       this.bidModel='#bidModel';
  //       this.reportform="#reportform";
  //     }
  //     else{
  //       this.bidModel='#loginform';
  //       this.reportform="#loginform";
  //     }
  //   });
  //   this.appService.getAllDetailsOfProductById(this.prodID).subscribe(data=>{     
  //   this.productView=data.product;
  //   this.attributeMap=data.attributes;

  //   //If bid enabled and Buyer is viewing the product then show all bids
  //   if(this.productView['bid'] && this.action=='myads'){
  //       this.appService.getAllBidsOfProduct(this.limit,this.offset,this.productView['prodId']).subscribe(data=>{
  //         this.bidsOnProductList=data.bidList;
  //         console.log("BIDS LIST"+JSON.stringify(this.bidsOnProductList));
  //       },error=>{
  //         console.log('error');
  //       })

  //   }

  //   // If bid is enaled 
  //    if(this.productView['bid'] && this.action!='myads'){
  //       this.appService.getAllBidsOfProduct(this.limit,this.offset,this.productView['prodId']).subscribe(data=>{
  //         this.bidsOnProductList=data.bidList;
  //         console.log("BIDS LIST"+JSON.stringify(this.bidsOnProductList));
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
        this.reportform="#reportform";
        this.intrestModel="#iamIntrestedModel";
      }
      else{
        this.bidModel='#loginform';
        this.reportform="#loginform";
        this.intrestModel="#loginform";
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
          this.showOtherBidDetails=true;
      this.bidsOnProductList=data.bidList;
        }
    //If not then show last 5 bids
        else 
          {
            this.showOtherBidDetails=false;
    this.bidsOnProductList=data.bidList;
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
      if(!this.loginStatus){
         this.showError("Please Login to continue","Warning");
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

    openModel(action,prodId){
     
      if(action=='BID'){
        //OPEN BID MODEL HERE
      this.currentUser=this.userService.getCurrentUser();    
      if(this.loginStatus){
        this.action='list';
      this.bidForm.controls.product.patchValue({
        prodId:prodId
      });
      }
    //OPEN LOGIN MODEL IF NOT LOGGED IN

      }
  else
    {

      this.currentUser=this.userService.getCurrentUser();    
      if(this.loginStatus){
        this.action='list';
      this.intrestForm.controls.product.patchValue({
        prodId:prodId
      });
      }

    }


    }

    openClosedDeal(prodId){
   
    this.closedDealForm.controls.productModel.patchValue({
        prodId:prodId
      });
    }

    bidFormOnSubmit(){
      console.log(this.bidForm);

      if(this.bidForm.invalid)
      {
        this.showError("Please fill all the details","Error");
        //Message here
      }
      else{
         this.appService.saveBidForProduct(this.bidForm.value).subscribe(data=>{
          this.showSuccess("Bid Placed","Success");
        },error=>{
          console.log('error',error);
         this.showError(error.message,"Warning")
        });
      }
    }



        intrestFormOnSubmit(){
      if(this.intrestForm.invalid)
      {
        this.showError("Please fill all the details","Error");
        //Message here
      }
      else{
      //  alert(JSON.stringify(this.intrestForm.value))
         this.appService.saveIntrestForProduct(this.intrestForm.value).subscribe(data=>{
          this.showSuccess("Intrest Shown, Seller Will contact you.","Success");
        },error=>{
          console.log('error',error);
         this.showError(error.message,"Warning")
        });
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
          this.closeAddExpenseModal.nativeElement.click();
          window.location.reload();
          
        },error=>{
         this.showError(error.message,"Warning")
        });
       }
        this.closeAddExpenseModal.nativeElement.click();
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

    closepopup(id){
      document.getElementById(id).style.display="none";
      document.getElementsByTagName("body")[0].classList.remove("modal-open");
      var element = document.getElementsByClassName("modal-backdrop"); 
      while(element[0]) {
        element[0].parentNode.removeChild(element[0]);
    }​
    }

    enableDisable(checked)
    {
      if(checked)
        {
          this.intrestForm.controls.phoneNumber.setValue('');
          this.intrestForm.controls.phoneNumber.disable();

        }
      else
      {
this.intrestForm.controls.phoneNumber.enable();
      }
    }

    
}
