import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";

@Component({
  selector: 'app-closeddeal',
  templateUrl: './closeddeal.component.html',
  styleUrls: ['./closeddeal.component.scss']
})
export class CloseddealComponent implements OnInit {
count: any;

    imageUrl = this.appService.BaseUrl+"/downloadFile/";
   limit=6;
  offset=1;
 closedDealList:any=[];
  action:string='block';
  public userId;
  constructor(private appService:AppService) { 
    
  }

  ngOnInit() {
     this.getAllClosedDeals();
  }

   getAllClosedDeals(){
    this.appService.getAllClosedDeals(this.limit,this.offset).subscribe(data=>{
      this.count=data.count;
      this.closedDealList=data.closedDealList;
    }),error=>{
      console.log(error);
    }
  }


  
    pageChanged(event){
    this.offset=event;
    this.getAllClosedDeals();
  }

}
