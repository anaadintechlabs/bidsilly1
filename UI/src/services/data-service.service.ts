import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { User } from 'models/user.model';
import { ApiService } from './api.service';
import { AppService } from 'app/app.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  currentUser:User;
  
  public limit=15;
  public offset=1;
  productList:any=[];

  private messegeSource= new BehaviorSubject<boolean>(false);
  currentMessage = this.messegeSource.asObservable();

  private isLoggoedin = new BehaviorSubject<boolean>(false);
  currentStatus = this.isLoggoedin.asObservable();
 
  private makeSearchStatus = new BehaviorSubject<boolean>(false);
  makeSearch = this.makeSearchStatus.asObservable();


  private serchDataParam =new BehaviorSubject<any>({});
  curruentSerchData = this.serchDataParam.asObservable();

  private searchDataCount = new BehaviorSubject<number>(0);
  count = this.searchDataCount.asObservable();

  private productOfCategory = new BehaviorSubject<Boolean>(false);
  poc = this.productOfCategory.asObservable();

  private productOfSubCategory = new BehaviorSubject<Boolean>(false);
  posc= this.productOfSubCategory.asObservable();

  private searchBySubCat = new BehaviorSubject<number>(0);
  subCatId = this.searchBySubCat.asObservable();

  private searchByCat = new BehaviorSubject<number>(0);
  catId = this.searchByCat.asObservable();

  private userDashboardLinks = new BehaviorSubject<string>("");
  dashboardLinks = this.userDashboardLinks.asObservable();

  constructor(private userService: UserServiceService, 
    private appService: AppService) {
      // this.getAllProduct();
     }

     changeDashboardLink(link:string){
       this.userDashboardLinks.next(link);
     }

     changeSubCatID(num:number){
       this.searchBySubCat.next(num);
     }
     changeCatID(num:number){
       console.log("num is"+num);
      this.searchByCat.next(num);
    }
  changeMessage(message:boolean){
    this.messegeSource.next(message);
  }

  changeloginStatus(login:boolean){
    this.currentUser=this.userService.getCurrentUser();
    if(Object.keys(this.currentUser).length){
      this.isLoggoedin.next(login);
      console.log(login);
    }
  }
  changeLoginStatusManually(login:boolean){
    this.isLoggoedin.next(login);
 }
  changeSearchData(data:any){
    this.serchDataParam.next(data);
  }
  changecount(num:number){
    this.searchDataCount.next(num);
  }
  changePOC(status:boolean){
    this.productOfCategory.next(status);
  }

  changePOSC(status:boolean){
    this.productOfSubCategory.next(status);
  }
//   getAllProduct()
// {
//  // console.log('limit',this.limit,'offset',this.offset);
//   this.appService.getAllProducts(this.limit,this.offset).subscribe(data=>{
//     this.productList=data.productList;
//     console.log(this.productList);
//   },error=>{
//     console.log('error');
//   });
// }

changeMakeSearchStaus(num:boolean){
  this.makeSearchStatus.next(num);
}

}

