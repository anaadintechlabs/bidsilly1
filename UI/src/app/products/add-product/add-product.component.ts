import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ToastrManager } from 'ng6-toastr-notifications';
import { ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import { DataServiceService } from 'services/data-service.service';
import { CatagorySidebarComponent } from 'app/catagory-sidebar/catagory-sidebar.component';
//CHANES BY SANCHIt

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  //showPrice: boolean=true;
  enableProduct: boolean = true;

  @ViewChild('inputFile') myInputVariable: ElementRef;
  
  subCategorySelected: boolean;
  attributeList: any = [];
  subCategoryList: any=[];
  categoryList: any = [];

  
  models:any=[];
  attributeMap:any={};
  allowBidding:boolean;
  priceSuitableForBidding:boolean;
  limit:number=15;
  offset:number=1;
   submitted:boolean=false;
   minimumBidAmmount:number;
     bidEnable:boolean=false;
     formPart:number=1;
 selectedCategory:string;
 selectedSubCategory:string;
  myFiles:string [] = [];
  urlArray:any=[];
  showSubcategory:boolean=false;

     productForm = new FormGroup({
      category:new FormGroup({
         catCode:new FormControl('',[Validators.required])
       }),
      subCategory:new FormGroup({
         catCode:new FormControl('',[Validators.required])
       }),
      prodName:new FormControl('',[Validators.required, Validators.maxLength(100),Validators.minLength(3)]),
      prodDesc:new FormControl('',[Validators.required, Validators.maxLength(2000),Validators.minLength(3)]),
      phoneNumber:new FormControl('',[Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^[6-9]\d{9}$/)]),
      city:new FormControl('',[Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
      model:new FormControl('',[Validators.maxLength(50),Validators.minLength(3)]),
      price:new FormControl('',[Validators.required, Validators.maxLength(7),Validators.minLength(3)]),
      // attributes:new FormControl(''),   
      // allowNumber:new FormControl(),  

      // prodName:new FormControl(''),
      // prodDesc:new FormControl(''),
      // phoneNumber:new FormControl(''),
      // city:new FormControl(''),
      // model:new FormControl(''),
      // price:new FormControl(''),
      attributes:new FormControl(''),   
      allowNumber:new FormControl(''),  
      
      bid : new FormControl(''),
      bidTime:new FormControl(''),
      bidamount:new FormControl(''),
    
  });
  imageUrl = this.appService.BaseUrl+"/downloadFile/";


    selected = 'option2';
    constructor(public toastr: ToastrManager,
    private appService : AppService,
    private fb:FormBuilder,
    private router: Router,
    private data: DataServiceService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.getAllCategories();
    this.headerText();

  }
  headerText(){
    if(this.router.url=='/home'){
      this.data.changeMessage(true);
    }
    else{
      this.data.changeMessage(false);
    }
  }


      showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }


    getAllCategories(){
    this.appService.getAllCategories(this.limit,this.offset).subscribe(data=>{
      this.categoryList=data.categoryList;
      console.log('all categoryes'+this.categoryList);
    },error=>{
      console.log('error');
    });
  }

  setBidding(event){
    this.bidEnable=event.target.checked;
  }

  productFormOnSubmit(action)
  {
    this.submitted=true;
    console.log(this.productForm);
   if(this.productForm.invalid){
     console.log('invalid form');
   }
    else{
      //Now fetch those attribute and set it in attributes form control
       this.attributeList.forEach(element => {
         this.attributeMap[element.attributeId]=this.productForm.controls[element.attributeId].value;
         console.log(this.productForm.controls[element.attributeId].value);
       });
        this.productForm.patchValue({
          attributes:this.attributeMap
        });
        if(this.bidEnable){
          var x = 3; //or whatever offset
          var CurrentDate = new Date(); 
          console.log("Current date:", CurrentDate);  
          CurrentDate.setMonth(CurrentDate.getMonth() + x);
          console.log("Date after " + x + " months:", CurrentDate);
          // after 3 month
          this.productForm.controls.bidTime.setValue(CurrentDate);
        }

      
      const productData = this.productForm.value;
      const formData = new FormData();
      formData.append('productString', JSON.stringify(productData));
      for (var i = 0; i < this.myFiles.length; i++) { 
        formData.append("file", this.myFiles[i]);
      }
     this.appService.saveProduct(formData).subscribe(data=>{
     this.showSuccess('Product added successfully, wait for Approval', 'Success!');
     this.formPart=1;
     this.showSubcategory= false;
     window.scroll(0,0);
     this.productForm.reset();
     this.productForm.markAsUntouched();
     this.myFiles=[];
     this.urlArray=[];
     this.attributeList=[];
     this.submitted=false;
     this.bidEnable=false;
   },error=>{
     console.log('error');
   })
     }
  }
  // showsubCat(category){
  //   this.appService.getAllSubCategoryAndAttributeOfCategoryCode(category.catCode,this.limit,this.offset).subscribe(data=>{    
  //     this.productForm.controls.category.patchValue({
  //       catCode:category.catCode
  //     });
  //     this.selectedCategory= category.catName;
  //     this.subCategoryList=data.subCategoryList;
  //     this.allowBidding=category.allowBidding;
  //     this.minimumBidAmmount = category.minimumAmount;
  //     this.removePreviousAddedFormControl();

  //     this.priceSuitableForBidding=false;
  //     this.attributeList=data.attributeList;
  //     this.attributeList.forEach(element => {
  //       this.productForm.addControl(element.attributeId,new FormControl(''))
  //     });
  //     console.log(this.subCategoryList);
  //   })
  // }
  showsubCat(category){
    this.appService.getAllSubCategoryWithCatId(this.limit,this.offset,category.catCode).subscribe(data=>{    
      this.productForm.controls.category.patchValue({
        catCode:category.catCode
      });
       this.removePreviousAddedFormControl();
      this.selectedCategory= category.catName;
      this.subCategoryList=data.subCategoryList;
      this.allowBidding=category.allowBidding;
      this.minimumBidAmmount = category.minimumAmount;
      this.showSubcategory=true;
      this.priceSuitableForBidding=false;
    })
  }
  // showform(subCategory){
  //   this.productForm.controls.subCategory.patchValue({
  //     catCode:subCategory.catCode
  //   });
  //   this.selectedSubCategory= subCategory.catName;
  //   this.subCategorySelected=true;
  //   this.models=[];
  //   if(subCategory.modelAvailable){
  //     this.models=subCategory.models.split(',');
     
  //   }
  //   this.formPart=2;
  // }
  showform(subCategory){
    this.productForm.controls.subCategory.patchValue({
      catCode:subCategory.catCode
    });
   //First Removeing previous then adding new
       this.removePreviousAddedFormControl();
     this.appService.getAllAttributeOfSubCategoryCode(subCategory.catCode,this.limit,this.offset).subscribe(data=>{    
     this.attributeList=data.attributeList;
      this.attributeList.forEach(element => {
        this.productForm.addControl(element.attributeId,new FormControl(''))
      });
     });
     //this.showPrice=subCategory.showPrice;
    this.selectedSubCategory= subCategory.catName;
    this.subCategorySelected=true;
    this.models=[];
    if(subCategory.modelAvailable){
      this.models=subCategory.models.split(',');
     
    }
    this.formPart=2;
  }
   getAllSubCategoryAndAttributeOfCategoryCode(category){

    this.appService.getAllSubCategoryAndAttributeOfCategoryCode(category.catCode,this.limit,this.offset).subscribe(data=>{    
      this.productForm.controls.category.patchValue({
        catCode:category.catCode
      });
      this.subCategoryList=data.subCategoryList;
      this.allowBidding=category.allowBidding;
      this.minimumBidAmmount = category.minimumAmount;
      this.priceSuitableForBidding=false;
       //Before Adding New Attribute Remove Previous Attribute The Product
      this.removePreviousAddedFormControl();
       this.attributeList=data.attributeList;
       this.attributeList.forEach(element => {
         this.productForm.addControl(element.attributeId,new FormControl(''))
       });   
    },errpr=>{
      console.log('error');
    });
  }

  removePreviousAddedFormControl(){
    console.log(this.productForm);
  this.attributeList.forEach(element => {
         this.productForm.removeControl(element.attributeId)
       });
        console.log('after delete form group is ',this.productForm);
       
  }

  checkForModelorLeafCategory(subCategory)
  {
     this.productForm.controls.subCategory.patchValue({
        catCode:subCategory.catCode
      });
    this.subCategorySelected=true;
    this.models=[];
    if(subCategory.modelAvailable){
      this.models=subCategory.models.split(',');
     
    }
    
  }

enableDisable(event){
  this.enableProduct=!event;
}


 onSelectFile(event) {
  
     console.log (event.target.files);
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
    console.log('total imags'+this.myFiles.length);
  }


  checkBiddingAmount(){
    let amountEntered=this.productForm.controls.price.value;
    if(amountEntered>this.minimumBidAmmount)
      {
        this.priceSuitableForBidding=true;
      }
    else{
      this.priceSuitableForBidding=false;
    }
  }


  changeFormProcess(view:number){
  
    // if(view==2){
    //   if(this.models.length>0 || this.attributeList.length>0){
    //     this.formPart=view;
    //   }
    //   else{
    //     this.formPart=3;
    //   }
    // }
    // else{
      this.formPart=view;
    // }
  }
  changeBackFormProcess(view:number){
  
    // if(view==2){
    //   if(this.models.length>0 || this.attributeList.length>0){
    //     this.formPart=view;
    //   }
    //   else{
    //     this.formPart=1;
    //   }
    // }
    // else{
       this.formPart=view;
       this.showSubcategory=false;
    // }
  }

  checkValue(event)
  {
    console.log('event s'+event);
  }
}
