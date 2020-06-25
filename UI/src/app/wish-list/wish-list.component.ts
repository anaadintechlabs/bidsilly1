import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'app/app.service';
import { UserServiceService } from "services/user-service.service";
import { User } from "models/user.model";
import { DataServiceService } from 'services/data-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  currentUser: User;
  imageUrl = this.appService.BaseUrl+"/downloadFile/";
  allWishList:any=[];
  public limit = 15;
  public offset = 1;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  selectedProdId: any;
  constructor(private appService : AppService,
    private userService:UserServiceService,
    private data: DataServiceService,
    private router: Router,
    public toastr: ToastrManager,) { }

    reportedAdForm=new FormGroup({

      productId:new FormGroup({
        prodId:new FormControl('')
      }),
      description:new FormControl('',Validators.required),
      comment:new FormControl('',Validators.required)
      
      
    });
  ngOnInit() {
    this.getWishList();
    this.headerText();
  }

  loadMoreProducts(){
    this.offset+=1;
    this.limit=this.limit*this.offset;
    this.offset-=1;
    this.getWishList();
  }
  getWishList()
  {
    // this.currentUser=this.userService.getCurrentUser();
    // console.log('user us'+JSON.stringify(this.currentUser));
    this.appService.getWishList(this.limit,this.offset-1).subscribe(data=>{
      this.allWishList=data.wishlist;
      console.log(this.allWishList);
    },error=>{
      console.log('error');
    });
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
  reportedProduct(prodId){
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
        console.log(error);
      })
    }

  }
  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }
  showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }
}
