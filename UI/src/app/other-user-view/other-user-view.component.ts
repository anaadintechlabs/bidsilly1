import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-other-user-view',
  templateUrl: './other-user-view.component.html',
  styleUrls: ['./other-user-view.component.scss']
})
export class OtherUserViewComponent implements OnInit {
  public limit=15;
  public offset=1;
  public userId;
  productList:any=[];
  imageUrl = this.appService.BaseUrl+"/downloadFile/";
  constructor(private appService:AppService,private activateRoute:ActivatedRoute,private router:Router) { 
    this.userId=this.activateRoute.snapshot.queryParams['ID'] || 'NO ID';
  }

  ngOnInit() {
    this.getAllProduct();
  }
  getAllProduct(){
 // console.log('limit',this.limit,'offset',this.offset);
  this.appService.getAllProducts(this.limit,this.offset).subscribe(data=>{
    this.productList=data.productList;
    console.log(this.productList);
  },error=>{
    console.log('error');
  });
}
}
