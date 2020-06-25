import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from 'services/data-service.service';
import { UserServiceService } from 'services/user-service.service';
import { AppService } from 'app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { User } from 'models/user.model';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.scss']
})
export class ViewAllProductComponent implements OnInit {
  count: any;
  loginStatus: boolean;
  reportform:string;
  login:string;
  currentUser: User;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  selectedProdId: any;
  originOfList:any;
  public limit=15;
  public offset=1;
  categoryListWithCount:any=[];
  categoryCount:any=[];
  searchDataLength:boolean=false;
  productList:any=[];
  imageUrl = this.appService.BaseUrl+"/downloadFile/";
  action: String;
  id:number=1;
  minPrice:string="";
  maxPrice:string="";
  minDate:string;
  maxDate:string;
  srchParam:any=[];
  makeSearch:boolean=true;
  priceRange:any;
  public CATID;
  public SCATID;
  constructor(
    public toastr: ToastrManager,
    private appService : AppService,
    private userService:UserServiceService,
    private router: Router,
    private data: DataServiceService,
    private activateRoute:ActivatedRoute
  ) {
    // this.CATID=this.activateRoute.snapshot.queryParams['ID'];
    // this.SCATID = this.activateRoute.snapshot.queryParams['sid'];
   }

  searchForm=new FormGroup({
    searchString:new FormControl(''),
    location:new FormControl(''),
    category:new FormControl(''),
    dateRange:new FormControl(''),
    price:new FormControl(''),  
  });

  reportedAdForm=new FormGroup({

    productId:new FormGroup({
      prodId:new FormControl('')
    }),
    description:new FormControl('',Validators.required),
    comment:new FormControl('',Validators.required)
    
    
  });

  searchProduct(){
   
    this.searchForm.patchValue(this.srchParam);
   
    this.appService.searchProduct(this.searchForm.value,this.limit,this.offset).subscribe(data=>{
       this.originOfList="SEARCH";
        this.data.changecount(data.count);
        this.productList=data.data;
        this.count=data.count;
       
        // SHOW THE OUTPUT PRODUCT ON DASHBOARD
        },error=>{
          console.log('error',error);
        });
  }  
  ngOnInit() {
    window.scroll(0,0);
    this.data.currentStatus.subscribe(login => this.loginStatus = login);
    this.data.curruentSerchData.subscribe(data=> this.srchParam = data);
    console.log(this.srchParam+'in inint')
    this.data.count.subscribe(num => {
    console.log(num);
      if(num>0){
        this.searchDataLength=true;
      }
      else{
        console.log("zero result");
      }
    })
    this.data.makeSearch.subscribe(data=>{
      if(data){
        console.log('search run');
        this.searchProduct();
      }
      else{
        this.getAllProduct();
      }
    });
    this.data.subCatId.subscribe(id=> this.SCATID=id);
    this.data.catId.subscribe(id=> this.CATID=id);
    
    this.data.poc.subscribe(status=>{
      if(status){
        this.getAllProductOfCategory(this.CATID);
      }
    });
    // this.data.poc.subscribe(status=>{
    //   if(status){
    //     console.log(status);
    //     this.getAllProductOfCategory(this.CATID);
    //   }
    // });
    this.data.posc.subscribe(status=>{
      if(status){
        this.getallProductOfSubCategory(this.SCATID);
      }
    });
    this.action = 'block';
    this.getAllCategoryWithCount();
    this.headerText();
  }

  getAllProductOfCategory(id){
   this.appService.getAllProductOfCategory(this.limit,this.offset,id).subscribe(data=>{
      this.productList=data.productList;
      this.count=data.count;
     this.originOfList="CATEGORY";
      this.data.changePOC(false);
    },error=>{
      console.log('error');
    });
  }

  getallProductOfSubCategory(id){
    this.appService.getAllProductOfSubCategory(this.limit,this.offset,id).subscribe(data=>{
      this.productList=data.productList;
      this.count=data.count;
      this.originOfList="SUBCATEGORY";
      this.data.changePOSC(false);
    },error=>{
      console.log('error');
    });
  }

  applyPriceFilter(){
    console.log(this.minPrice);
    console.log(this.maxPrice);
    if(this.minPrice != "" && this.maxPrice != "")
    {
      this.srchParam.price = this.minPrice+','+this.maxPrice;
    }   
    else{
      this.srchParam.price="";
    }
    console.log(this.srchParam); 
    this.searchProduct();
  }
  applyDateFilter(){
    console.log(this.minDate);
    console.log(this.maxDate);
    this.srchParam.dateRange = this.minDate+','+this.maxDate;
    this.applyPriceFilter();
  }

  getAllProduct()
{
 // console.log('limit',this.limit,'offset',this.offset);
  this.appService.getAllProducts(this.limit,this.offset).subscribe(data=>{
    this.originOfList="ALLPRODUCT";
    this.productList=data.productList;
    this.count=data.count;
  },error=>{
    console.log('error');
  });
}
  isClicked(num: number){
    for (let index = 1; index < 4; index++) {
      if(index==num){
        this.id = num;
      }
    }
  }
  changeView(view: String) {
    if (view == 'list') {
      this.action = 'list';
    }
    if (view == 'table') {
      this.action = 'table';
    }
    if (view == 'block') {
      this.action = 'block';
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
  getAllCategoryWithCount()
{
  this.appService.getAllCategoryWithCount(this.limit,this.offset).subscribe(data=>{
   
       this.categoryListWithCount=data.subCategoryList.catCount;
        console.log(this.categoryListWithCount);
      },error=>{
        console.log(error);
      })

    }  
    addToWishlist(prodId){   
      this.currentUser=this.userService.getCurrentUser();
     
      //This logic will be changed
      if(!this.loginStatus){
        console.log("inside not login");
        // alert("Please login to continue");
        this.login="#loginform";

      }
      else{
        this.login="";
        console.log("inside login");
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
    showError(msg, title) {
      this.toastr.errorToastr(msg, title);
    }
    showSuccess(msg, title) {
      this.toastr.successToastr(msg, 'Success!');
    }

    reportedProduct(prodId){
          
      this.currentUser=this.userService.getCurrentUser();    
      //This logic will be changed
      if(this.loginStatus){
        this.reportform="#reportform";
      this.selectedProdId=prodId;
      this.reportedAdForm.controls.productId.patchValue({
        prodId:prodId
      });
      }
      else{
        this.reportform="#loginform";
      }
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


    loadMoreProducts(){
      //functionality to be implement
      this.offset+=1;
    this.limit=this.limit*this.offset;
    this.offset-=1;
      if(this.originOfList=='SEARCH')
        {
          this.searchProduct();
        }
      else  if(this.originOfList=='CATEGORY')
        {
          this.getAllProductOfCategory(this.CATID);
        }
      else  if(this.originOfList=='SUBCATEGORY')
        {
          this.getallProductOfSubCategory(this.SCATID);
        }
       else
        {
          this.getAllProduct();
        }
    }
}
