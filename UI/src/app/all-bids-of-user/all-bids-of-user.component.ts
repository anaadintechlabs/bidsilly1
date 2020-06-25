import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-bids-of-user',
  templateUrl: './all-bids-of-user.component.html',
  styleUrls: ['./all-bids-of-user.component.scss']
})
export class AllBidsOfUserComponent implements OnInit {

  imageUrl = this.appService.BaseUrl+"/downloadFile/";
  limit=15;
  offset=1;
  bidList:any=[];
  action:string='block';
  id:number=1;
  count:any;
  constructor(private appService:AppService) { }

  reportedAdForm=new FormGroup({

    productId:new FormGroup({
      prodId:new FormControl('')
    }),
    description:new FormControl('',Validators.required),
    comment:new FormControl('',Validators.required)
    
    
  });
  
  ngOnInit() {
  this.getAllBidsOfUser();
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
    this.getAllBidsOfUser();
  }
  pageChanged(event){
    this.offset=event;
    this.getAllBidsOfUser();
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
  getAllBidsOfUser(){
    this.appService.getAllBidsOfUSer(this.limit,this.offset).subscribe(data=>{
      this.bidList=data.bidList;
      this.count=data.count;
      console.log(this.bidList);
    }),error=>{
      console.log(error);
    }
  }
}
