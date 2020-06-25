import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'services/user-service.service';
import { DataServiceService } from 'services/data-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginStatus:boolean;
  headerText:boolean;
  public limit=15;
  public offset=1;
  categoryListWithCount:any=[];
  categoryCount:any=[];
  srchData:any=[];
   srchKey:string;
   srchLoc:string='';
   srchCat:string='';
   secrArray:any;
  constructor(
    private router : Router,
    private userService: UserServiceService,
    private data : DataServiceService,
    private appService : AppService
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.headerText = message);
    this.data.currentStatus.subscribe(login => this.loginStatus = login);
    this.headerTextView();
    this.getAllCategoryWithCount();
  }

  headerTextView()
{
  if(this.router.url=='/home'){
    this.data.changeMessage(true);
    console.log(this.router.url);
  }
}

searchForm=new FormGroup({
  searchString:new FormControl(''),
  location:new FormControl(''),
  category:new FormControl(''),
  dateRange:new FormControl(''),
  price:new FormControl(''),  
});

searchProduct(){
  this.secrArray={searchString:this.srchKey,location:this.srchLoc,category:this.srchCat};
  console.log(this.secrArray);
  this.data.changeSearchData(this.secrArray);
  this.data.changeMakeSearchStaus(true);
  this.router.navigateByUrl('/home/allProducts');
}
// searchProduct(){
//   console.log(this.searchForm.value);
 
//   this.appService.searchProduct(this.searchForm.value,this.limit,this.offset).subscribe(data=>{
//       // console.log(data);
//       this.data.changecount(data.count);
//       this.srchData=data.data;
//       this.data.changeSearchData(this.srchData);
//       this.data.changeMessage(false);
//       this.router.navigateByUrl('/home/allProducts');  
//       // SHOW THE OUTPUT PRODUCT ON DASHBOARD
//       },error=>{
//         console.log('error',error);
//       });
// }
getAllCategoryWithCount()
{
  this.appService.getAllCategoryWithCount(this.limit,this.offset).subscribe(data=>{
       this.categoryListWithCount=data.subCategoryList.catCount;
        console.log(this.categoryListWithCount);
      },error=>{
        console.log(error);
      })

    }  
}
