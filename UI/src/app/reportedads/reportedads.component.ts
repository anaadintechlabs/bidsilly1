import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-reportedads',
  templateUrl: './reportedads.component.html',
  styleUrls: ['./reportedads.component.scss']
})
export class ReportedadsComponent implements OnInit {

  count:any;
  public limit=20;
  public offset=1;
reportedAdsList:any=[];


  constructor(public toastr: ToastrManager,private appService : AppService) { }


       showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }
  ngOnInit() {
   // this.getAllProducts();
   //Now I will get all repoprted adds from reportedadds table
   this.getAllReportedAds();
  }
  pageChanged(event){
    this.offset=event;
    this.getAllReportedAds();
  }
  // getAllProducts(){
  //   this.appService.getAllProducts(this.limit,this.offset).subscribe(data=>{
  //     this.productList=data.categoryList;
  //     console.log(this.productList);
  //     // this.action='list';
  //   },error=>{
  //     console.log('error');
  //   });
  // }
  getAllReportedAds(){
        this.appService.getAllReportedAds(this.limit,this.offset).subscribe(data=>{
      this.reportedAdsList=data.reportedAdsList;
      this.count=data.count;
      console.log(this.reportedAdsList);
      // this.action='list';
    },error=>{
      console.log('error');
    });
  }


  deleteReportedProduct(reportedId){
    this.appService.blockAdd(reportedId).subscribe(data=>{
this.showSuccess('Ad has been removed.', 'Success!');
this.getAllReportedAds();
    },error=>{
      console.log('error',error);
    })
  }

}
