import { JwtServiceService } from 'services/jwt-service.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Errors } from 'models/error.model';
import { Router } from '@angular/router';
import { UserServiceService } from 'services/user-service.service';
import { response } from 'models/reesponse.model';
import { User } from "models/user.model";
import { DataServiceService } from 'services/data-service.service';
import { AppService } from 'app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {
 currentUser: User;
  showLoginForm:boolean=true;
  showRegistrationForm:boolean=false;

  public limit=15;
  public offset=0;
  loginStatus:boolean;

  response: response ;
  signUpForm:FormGroup;
  post:string;
  headerText:boolean=false;

  signinOption:boolean;
  profileoOption:boolean;
  displayCat:boolean=false;

  myMap:any;
  loginForm:string;
  categoryListWithCount:any=[];
  subCategoryList:Map<String,Object>;
  subCat2:Map<String,String>;
  authType: String = '';
  authForm: FormGroup;
  isSubmitting = false;
  errors: Errors = {errors: {}};
  showMenu:boolean = false;

  constructor(private router : Router,
    private userService: UserServiceService,
    private data : DataServiceService,
    private appService: AppService,
    private toastr: ToastrManager,
    private jwtService:JwtServiceService,
    private dataService : DataServiceService){
  }

isSticky:boolean=false;

  ngOnInit() {
    if(this.jwtService.getToken()!=null){
      this.loginStatus=true;
    }
    else{
    this.data.currentMessage.subscribe(message => this.headerText = message);
    this.data.currentStatus.subscribe(login =>{
      this.loginStatus = login;
      if(login){
        this.post="";
      }
      else{
        this.loginForm='#loginform';
        this.post="#loginform";
      }
    });
  }
  this.data.currentStatus.subscribe(login =>{
    this.loginStatus = login;
    if(login){
      this.post="";
    }
    else{
      this.loginForm='#loginform';
      this.post="#loginform";
    }
  });
    console.log(this.loginStatus);
    this.getAllCategoryAndSubCategory();


    // jquery for category menu hover //
    $(".mydropdown1").hover(function(){
      $(".float").css("display", "block");
    },function(){
      $(".float").css("display", "none");
    });(jQuery);
  }


  // displayCategory(){
  //   this.displayCat = !this.displayCat;
  // }
 
@HostListener('window:scroll', ['$event'])
checkscroll(){
  this.isSticky = window.pageYOffset >= 90;
}
logOutUser(){
  this.userService.logout();
  //RELOAD HERE
  this.data.changeLoginStatusManually(false);
  //
  window.location.reload();
  this.showSuccess("You have been logged out.", "Success");
}

      
  changeForm(formStatus:string){
    if(formStatus=='Login'){
      this.showLoginForm=true;
      this.showRegistrationForm=false;
    }
    if(formStatus=='Resistration'){
      this.showRegistrationForm=true;
      this.showLoginForm=false;
    }
  }
  showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }

  
  // registerUser() {
  //   const credentials = this.signUpForm.value;
  //   console.log(credentials);
  //   this.userService.attempiSignUp(credentials).subscribe(
  //     data => {
  //       this.response=data;
  //       if(this.response.message==="User registered successfully")
  //       {
  //         alert("user registered,Please login");
  //         this.router.navigateByUrl('guest/login');
  //       }
  //     },
  //     err => {
  //       if(err.status===401){
  //           this.router.navigateByUrl('guest/signup');
  //       }else{
  //         alert("Bad Request");
  //         this.router.navigateByUrl('guest/signup');
  //       }
  //     });
  //   }

    showWishList(){
      console.log('from navbar');
      this.currentUser=this.userService.getCurrentUser();
     
      //This logic will be changed
      if(!Object.keys(this.currentUser).length){
        alert("Please login to continue");
      }
      else{
        this.router.navigateByUrl('/home/wishlist');
      }
  }

  showSell(){
    if(this.loginStatus){
      this.router.navigateByUrl('/home/sell');
    }
  }

  callHome(){
this.router.navigateByUrl('/home');
  }

  callAllProduct(){
    this.router.navigateByUrl('/home/allProducts');
    
  }

  getAllCategoryWithCount()
  {
    this.appService.getAllCategoryWithCount(this.limit,this.offset).subscribe(data=>{
     
         this.categoryListWithCount=data.subCategoryList.catCount;
          console.log(this.categoryListWithCount);
          this.getAllSubCategory();
        },error=>{
          console.log(error);
        })
        
        this.getAllSubCategory();
      }  

      getAllSubCategory(){
        for(let index=0;index<this.categoryListWithCount.length;index++){
          let tempList=this.categoryListWithCount[index];
          this.appService.getAllSubCategoryWithCatId(this.limit,this.offset,tempList[0]).subscribe(data=>
            {
              // this.subCategoryList.push(JSON.stringify(data.subCategoryList));
            }),error=>{
              console.log('error');
            }
        }
        console.log(this.subCategoryList);
      }
      getAllCategoryAndSubCategory(){
        this.appService.getAllCategoryAndSubCategory().subscribe(data=>
            {
              this.myMap=data.categoryWithSubcategory;
              console.log("MY MAP ISSS"+JSON.stringify(this.myMap));
            }),error=>{
              console.log('error');
            }
      }
      
      checkSubcat(subcat:string){
        var n = subcat.includes("SUBCAT");
        if(n){
            this.subCat2 = this.subCategoryList[subcat];
        }
        return n;
      }
      checkSubcat2(subcat:string){
        var n = subcat.includes("SUBCAT");
        if(n){}
        else{return true;}
      }
      performSearch(num:number){
        this.data.changeSubCatID(num);
        this.data.changePOSC(true);
        // this.displayCategory();
      }
      performSearch2(catComma){
        let num =catComma.split(',')[0];
        console.log(num);
        this.data.changeCatID(num);
        this.data.changePOC(true);
        // this.displayCategory();
      }

      login(){
        document.getElementsByTagName("body")[0].style.paddingRight="0";
        console.log("worked");
      }

      redirect(link){
        this.dataService.changeDashboardLink(link);
      }
      displayMenu(link){
        this.showMenu = !this.showMenu;
        this.dataService.changeDashboardLink(link);
      }

    }
