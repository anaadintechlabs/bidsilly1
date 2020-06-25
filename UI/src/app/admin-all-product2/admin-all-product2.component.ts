import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from 'app/app.service';
import { User } from 'models/user.model';
import { UserServiceService } from 'services/user-service.service';

@Component({
  selector: 'app-admin-all-product2',
  templateUrl: './admin-all-product2.component.html',
  styleUrls: ['./admin-all-product2.component.scss']
})
export class AdminAllProduct2Component implements OnInit {
  allProductList:any;
  count:any;
  public limit = 20;
  public offset = 1;
  public reported:boolean;
  approvedProductList: any = [];
  productIdList = new Map();
  approved='APPROVED';
  deleted='DELETED';
  currentValue:any='All Products';
  action:string;
  view:string='All Products';
  imageUrl = this.appService.BaseUrl+"/downloadFile/";
  selectedUser:User;
  constructor(public toastr: ToastrManager,
     private appService: AppService,
     private user: UserServiceService) { }

  ngOnInit() {
    this.getAllProductsIrrespectiveOfStatus();
    this.currentValue='All Products';
    this.selectedUser= this.user.getCurrentUser();
  }

  productAction(value){
    if(value=="Approve Products"){
      this.action=value;
    }
    if(value=="Delete Products"){
      this.action=value;
    }
    // if(value=="Hold Products"){
    //   this.action=value;
    // }
  }
  performAction(){
    if(this.action=='Approve Products'){
      this.approveProduct();
    }
    if(this.action=='Delete Products'){
      this.deleteProduct();
    }
    // if(this.action=='Hold Products'){
      
    // }
  }
  productView(value){
    if(value=="All Products"){
      console.log(value);
      this.reported=false;
      this.view=value;
      this.currentValue=value;
      this.getAllProductsIrrespectiveOfStatus();
    }
    if(value=="Pending Products"){
      console.log(value);
      this.reported=false;
      this.view=value;
       this.currentValue=value;
      this.getAllPendingProduct();
    }
    if(value=="My Products"){
      console.log(value);
      this.reported=false;
      this.view=value;
       this.currentValue=value;
      this.getAllPostOfUser();
    }
    if(value=="Reported Products"){
      console.log(value);
      this.reported=true;
      this.view=value;
       this.currentValue=value;
      this.getAllReportedAds();
    }
    if(value=="Approved Products"){
      this.reported=false;
      this.view=value;
      this.getAllProductsDashboard();
    }
  }

  getAllProductsDashboard() {
    this.appService.getAllProductsDashboard(this.limit, this.offset-1).subscribe(data => {
      this.allProductList = data.productList;
      this.count=data.count;
    }, error => {
      console.log('error');
    });
  }

  getAllProductsIrrespectiveOfStatus(){
    this.appService.getAllProductsIrrespectiveOfStatus(this.limit, this.offset-1).subscribe(data => {
      this.allProductList = data.productList;
      this.count=data.count;
      console.log(this.allProductList);
    }, error => {
      console.log('error');
    });
  }

  
  getAllPendingProduct() {
    this.appService.getAllPendingProduct(this.limit, this.offset-1).subscribe(data => {
      this.allProductList = data.pendingProductList;
     
      this.count=data.count;
      
      console.log(this.allProductList);
    }, error => {
      console.log('error');
    });
  }
  getAllPostOfUser(){
    this.appService.getAllPostOfUser(this.limit,this.offset).subscribe(data=>{
       this.allProductList=data.productList;
       console.log(this.allProductList);
     },error=>{
       console.log('error');
     });
   }
   getAllReportedAds(){
    this.appService.getAllReportedAds(this.limit,this.offset).subscribe(data=>{
    this.allProductList=data.reportedAdsList;
    this.count=data.count;
    console.log(this.allProductList);
    // this.action='list';
    },error=>{
        console.log('error');
      });
  }
  saveList(e, prodId) {
    if (e.target.checked) {
      this.productIdList.set(prodId, prodId);
      console.log(this.productIdList);
    }
    else {
      this.productIdList.delete(prodId);
      console.log(this.productIdList);
    }
  }

  approveProduct() {
    this.approvedProductList = Array.from(this.productIdList.keys());
    this.appService.approveOrBlockProducts(this.approvedProductList,this.approved).subscribe(data => {
      this.showSuccess('Product(s) Approved', 'Success!');
      this.getAllPendingProduct();
    }, error => {
      console.log('error');
    });
  }
  approveProductByid(productId) {
    this.productIdList.set(productId, productId);
    this.approvedProductList = Array.from(this.productIdList.keys());
    this.appService.approveOrBlockProducts(this.approvedProductList,this.approved).subscribe(data => {
      this.showSuccess('Product(s) Approved', 'Success!');
      this.getAllPendingProduct();
    }, error => {
      console.log('error');
    });
  }

  deleteProduct() {
    this.approvedProductList = Array.from(this.productIdList.keys());
    this.appService.approveOrBlockProducts(this.approvedProductList,this.deleted).subscribe(data => {
      this.showSuccess('Product has been removed.', 'Success!');
      this.getAllPendingProduct();
    }, error => {
      console.log('error', error);
    })
  }

  deleteReportedProductById(reportedId){
    this.productIdList.set(reportedId, reportedId);
    this.approvedProductList = Array.from(this.productIdList.keys());
    this.appService.approveOrBlockProducts(this.approvedProductList,this.deleted).subscribe(data => {
      this.showSuccess('Product(s) Deleted', 'Success!');
      this.getAllPendingProduct();
    }, error => {
      console.log('error');
    });
  }

  showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }
  deleteReportedProduct(reportedId){
    this.appService.blockAdd(reportedId).subscribe(data=>{
    this.showSuccess('Ad has been removed.', 'Success!');
    this.getAllReportedAds();
    },error=>{
      console.log('error',error);
    })
  }

  pageChanged(event){
    this.offset=event;

  this.productView(this.currentValue);
  }

  pageChangedReported(event)
  {
    this.offset=event;
    this.getAllReportedAds();
  }


  showUser(user){
    this.selectedUser=user;
    console.log(this.selectedUser);
  }
}
