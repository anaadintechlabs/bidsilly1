import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";

@Component({
  selector: 'app-all-bids-of-products',
  templateUrl: './all-bids-of-products.component.html',
  styleUrls: ['./all-bids-of-products.component.scss']
})
export class AllBidsOfProductsComponent implements OnInit {

   imageUrl = this.appService.BaseUrl+"/downloadFile/";
  limit=15;
  offset=1;
  bidList:any=[];
  action:string='block';
  id:number=1;
  count:any;
  constructor(private appService:AppService) { }


  ngOnInit() {
  this.getAllBidsOfAllProductsOfaUser();
  }
  isClicked(num: number){
    for (let index = 1; index < 4; index++) {
      if(index==num){
        this.id = num;
      }
    }
  }
  loadMoreProducts(){
    this.offset+=1;
    this.limit=this.limit*this.offset;
    this.offset-=1;
    this.getAllBidsOfAllProductsOfaUser();
  }
  pageChanged(event){
    this.offset=event;
    this.getAllBidsOfAllProductsOfaUser();
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
  getAllBidsOfAllProductsOfaUser(){
    this.appService.getAllBidsOfAllProductsOfaUserz(this.limit,this.offset).subscribe(data=>{
      this.bidList=data.bidList;
      this.count=data.count;
     
      console.log(this.bidList);
    }),error=>{
      console.log(error);
    }
  }

}
