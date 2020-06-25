import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';
//CHANGES BY SANCHIT
@Component({
  selector: 'app-admin-all-product',
  templateUrl: './admin-all-product.component.html',
  styleUrls: ['./admin-all-product.component.scss']
})
export class AdminAllProductComponent implements OnInit {

  approved='APPROVED';
  deleted='DELETED';
  // imageUrl = 'http://localhost:8080/aclassdeal/api/downloadFile/';
  imageUrl = this.appService.BaseUrl+"/downloadFile/";
  public limit = 20;
  public offset = 1;
  count:any;
  id:number=1;
  action: String;
  allProductList: any = [];
  allPendingProductList: any = [];
  productIdList = new Map();
  approvedProductList: any = [];
  constructor(public toastr: ToastrManager, private appService: AppService) { }

  ngOnInit() {
    this.action = 'block';
  //  this.getAllProductsDashboard();
    this.getAllPendingProduct();
  }
  isClicked(num: number){
    for (let index = 1; index < 4; index++) {
      if(index==num){
        this.id = num;
      }
    }
  }
  pageChanged(event){
    this.offset=event;
  //  this.getAllProductsDashboard();
    this.getAllPendingProduct();
  }
  loadMoreProducts(){
    this.offset+=1;
    this.limit=this.limit*this.offset;
    console.log("now limit is"+this.limit);
    this.offset-=1;
   // this.getAllProductsDashboard();
    this.getAllPendingProduct();
  }
  showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }

  getAllProductsDashboard() {
    this.appService.getAllProductsDashboard(this.limit, this.offset-1).subscribe(data => {
      this.allProductList = data.productList;
      this.count=data.count;
    }, error => {
      console.log('error');
    });
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
  getAllPendingProduct() {
    this.appService.getAllPendingProduct(this.limit, this.offset-1).subscribe(data => {
      this.allPendingProductList = data.pendingProductList;
     
      this.count=data.count;
      
      console.log(this.allPendingProductList);
    }, error => {
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

  deleteReportedProduct() {
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

}
