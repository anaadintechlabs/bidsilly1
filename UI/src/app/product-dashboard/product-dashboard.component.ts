import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from 'services/data-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from 'services/user-service.service';
import { User } from 'models/user.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {

  allProductList:any;
  bidsOnProductList :any=[];
  count:any;
  display:string='block';
  public limit = 20;
  public offset = 1;
  public reported:boolean;
  id:number =1;
  approvedProductList: any = [];
  productIdList = new Map();
  bidList:any=[];
  approved='APPROVED';
  deleted='DELETED';
  currentValue:string='dashboard';
  action:string;
  profileView:string="edit";
  view:string='All Products';
  imageUrl = `${environment.api_url}` + "/api/downloadFile/";
  constructor(public toastr: ToastrManager,
     private appService: AppService,
    private router: Router,
    private data: DataServiceService,
    private userService: UserServiceService) { 
    }

  ngOnInit() {
    this.getAllPostOfUser();
    this.user= JSON.parse(this.userService.getUser());
    // console.log(this.user);
    this.toggleChecked=this.user.enableMobileNumber;
    this.data.dashboardLinks.subscribe(value => {
      if(value=="setting"){
        this.productView("Profile Setting");
        this.profileView="password";
      }else{
        this.productView(value);
      }
    });
    // this.currentValue='dashboard';
    this.headerText();
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

  productView(value){
    if(value=="My Ads"){
      // console.log(value);
      // this.view=value;
      this.view="All Products";
      this.currentValue=value;
      this.getAllPostOfUser();
    }
    if(value=="WishList"){
      // console.log(value);
      this.view=value;
       this.currentValue=value;
      this.getWishList();
    }
    if(value=="dashboard"){
      // console.log(value);
      this.view=value;
      this.currentValue=value;
      this.getAllPostOfUser();
    }
    if(value=="Approved Ads"){
      // console.log(value);
      this.view=value;
      this.getApprovedProduct();
    }
    if(value=="Rejected Ads"){
      // console.log(value);
      this.view=value;
      this.getRejectedProduct();
    }
    if(value=="UnApproved Ads"){
      // console.log(value);
      this.view=value;
      this.getUnApprovedProduct();
    }
    if(value=="Expired Ads"){
      // console.log(value);
      this.view=value;
      this.getExpiredProduct();
    }
    if(value=="My Bids"){
      // console.log(value);
      this.view=value;
      this.currentValue=value;
      this.getAllBidsOfUser();
    }
    if(value=="Profile Setting"){
      // console.log(value);
      this.view=value;
      this.profileView="edit";
      this.currentValue=value;
      this.getLoggerInUserDetails();
    }
    if(value=="edit"){
      this.profileView=value;
    }
    if(value=="password"){
      this.profileView=value;
    }
    if(value=="deactivate"){
      this.profileView=value;
    }

  }

  getApprovedProduct(){
    this.appService.getAllActiveProduct(this.limit,this.offset).subscribe(data=>{
      this.allProductList=data.productList;
      // console.log(this.allProductList);
    },error=>{
      // console.log('error');
    });
  }
  getRejectedProduct(){
    this.appService.getAllRejectedProduct(this.limit,this.offset).subscribe(data=>{
      this.allProductList=data.productList;
      // console.log(this.allProductList);
    },error=>{
      // console.log('error');
    });
  }
  getExpiredProduct(){
    this.appService.getAllExpiredProduct(this.limit,this.offset).subscribe(data=>{
      this.allProductList=data.productList;
      // console.log(this.allProductList);
    },error=>{
      // console.log('error');
    });
  }
  getUnApprovedProduct(){
    this.appService.getAllUnApprovedProduct(this.limit,this.offset).subscribe(data=>{
      this.allProductList=data.productList;
      // console.log(this.allProductList);
    },error=>{
      // console.log('error');
    });
  }
  getWishList()
  {
    // this.currentUser=this.userService.getCurrentUser();
    console.log('user us'+JSON.stringify(this.currentUser));
    this.appService.getWishList(this.limit,this.offset-1).subscribe(data=>{
      this.allProductList=data.wishlist;
      console.log(this.allProductList);
    },error=>{
      // console.log('error');
    });
  }

  getAllPostOfUser(){
    this.appService.getAllPostOfUser(this.limit,this.offset).subscribe(data=>{
       this.allProductList=data.productList;
      //  console.log(this.allProductList);
     },error=>{
      //  console.log('error');
     });
   }

   getAllBidsOfProduct(prodid){
    this.appService.getAllBidsOfProduct(this.limit,this.offset,prodid).subscribe(data=>{
      this.bidsOnProductList=data.bidList;
      // console.log("BIDS LIST"+JSON.stringify(this.bidsOnProductList));
    },error=>{
      // console.log('error');
    })
   }


  showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }


  pageChanged(event){
    this.offset=event;

  this.productView(this.currentValue);
  }
  changeDisplay(disp){
    this.display=disp;
    // console.log(this.display);
  }
  isClicked(num: number){
    for (let index = 1; index < 4; index++) {
      if(index==num){
        this.id = num;
      }
    }
  }
  getAllBidsOfUser(){
    this.appService.getAllBidsOfUSer(this.limit,this.offset).subscribe(data=>{
      this.bidList=data.bidList;
      this.count=data.count;
      // console.log(this.bidList);
    }),error=>{
      // console.log(error);
    }
  }

  // logout

  logOutUser(){
  this.userService.logout();
  //RELOAD HERE
  this.data.changeLoginStatusManually(false);
  //
  this.router.navigateByUrl("/home");
  this.showSuccess("You have been logged out.", "Success");
}

  // Edit profile
  public users:any;
  myFiles:string [] = [];
  urlArray:any=[];
  directUrl:boolean=true;

  userForm = new FormGroup({  
    id:new FormControl(''),  
    name:new FormControl('',[Validators.required, Validators.maxLength(50),Validators.minLength(2)]),
    email:new FormControl('',[Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
    phoneNumber:new FormControl('',[Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^[6-9]\d{9}$/)]),
    bio:new FormControl('',[Validators.required, Validators.maxLength(50),Validators.minLength(3)]),  
});
  //Email Will be unique
getLoggerInUserDetails(){
 
  this.appService.getLoggerInUserDetails().subscribe(data=>{
    this.users=data.user;
    
   this.userForm.patchValue(this.users);
    
   if(this.users.provider=='local')
    {
      this.directUrl=false;
    }
  },error=>{
    // console.log('error');
  });
}

  onSelectFile(event){
  this.myFiles=[];
 for (var i = 0; i < event.target.files.length; i++) { 
    if(event.target.files[i].size<=2048000)
    {
    this.myFiles.push(event.target.files[i]);
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[i]); // read file as data url
      
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.urlArray.push(reader.result);
      }
    }
    else{
      this.showError("Please select image less than 2MB.","Oops!");
    }
}
}

submitForm(){
  if(this.userForm.invalid)
    {
    this.showError("Please Fill all the details","Oops")
    }
  else{

    const categoryData = this.userForm.value;
        const formData = new FormData();
        formData.append('userString', JSON.stringify(categoryData));
        
        for (var i = 0; i < this.myFiles.length; i++) { 
            formData.append("file", this.myFiles[i]);
          }
          
    this.appService.updateUser(formData).subscribe(data=>{
    this.users=data.user;
   this.userForm.patchValue(this.users);
    this.showSuccess("Profile Updated","Success");
    this.urlArray=[];
   if(this.users.provider=='local')
    {
      this.directUrl=false;
    }
  },error=>{
    // console.log('error');
  });
  }
}


// password and deactivate settings

toggleChecked: boolean;
user:User;
// Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,30})/)
 public changePasswordForm=new FormGroup({
   oldPassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
  newPassword: new FormControl('', [Validators.required,,Validators.minLength(6)]),
  confirmPassword: new FormControl('', [Validators.required])
});


 public deactivateForm=new FormGroup({
   description: new FormControl('', [Validators.required,Validators.minLength(6)]),
   userId:new FormControl('')
});

changeSlider(event) {
  this.toggleChecked = !this.toggleChecked;
  //Here need to update in local storage as well as backend
  this.appService.enableDisablePhoneNumber(this.toggleChecked,this.user.id).subscribe(data=>{
    
    this.showSuccess("Settings saved successfully, Login again to see the effects","Success");
  },error=>{
    this.showError("something went wrong","Error");
  })
}


deactivateAndLogOut()
{
  alert(JSON.stringify(this.user));
  if(this.user!=undefined)
    {
      this.deactivateForm.patchValue({
       userId :this.user.id
      });
      this.appService.deactivateAndLogOut(this.deactivateForm.value).subscribe(data=>{
  //Logout here  
  alert(JSON.stringify(data));
  if(data && data.deactivated)
    {
      this.logOutUser();
    }
  },error=>{
    this.showError("something went wrong","Error");
  })
    }

}
onSubmit(){
  if (this.changePasswordForm.invalid) {
  this.showError("Please enter all the details","Error");
  }
  else{
   if(this.changePasswordForm.controls.confirmPassword.value==this.changePasswordForm.controls.newPassword.value){
      this.appService.setNewPassword(this.changePasswordForm.value,this.user.id).subscribe(data=>{
         this.showSuccess("New Password Set Successfully,","Success");
         this.changePasswordForm.reset();
      },error=>{
        this.showError(error.message, 'Error!');
      } )
      
    }
    else{
      this.showError("Password does not matched","error");
    }
  }
}


// report form

selectedProdId: any;
@ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
currentUser: User;

reportedAdForm=new FormGroup({

  productId:new FormGroup({
    prodId:new FormControl('')
  }),
  description:new FormControl('',Validators.required),
  comment:new FormControl('',Validators.required)
  
  
});

reportedProduct(prodId){
          
  this.currentUser=this.userService.getCurrentUser();    
  //This logic will be changed
  this.selectedProdId=prodId;
  this.reportedAdForm.controls.productId.patchValue({
    prodId:prodId
  });
}

reportFormOnSubmit(){
  if(this.reportedAdForm.invalid){
    this.showError("Please Fill all the information","Error");
  }
  else{
    this.appService.reportFormOnSubmit(this.reportedAdForm.value,this.selectedProdId).subscribe(data=>{
      this.showSuccess('Ad has been Reported to admin.', 'Success!');
      this.reportedAdForm.reset();
      this.closeAddExpenseModal.nativeElement.click();
    },error=>{
      // console.log(error);
    })
  }

}
headerText()
{
  if(this.router.url=="/home")
  {
    this.data.changeMessage(true);
  }
  else{
    this.data.changeMessage(false);
  }
}
}
