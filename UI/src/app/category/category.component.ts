import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from "app/app.service";
//CHANGES BY SANCHIT
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  count: any;
  key: string;
  keyList: any = [];
  invalidKey: boolean;
  selected: string = 'input';
  invalidModel: boolean;
   //For pagination
  public limit=6;
  public offset:number=1;
  public  modelAvailable:boolean=false;
  public biddingAllowed:boolean =false;
  public modelValue:any;
  categoryList:any=[];
  subCategoryList: any=[];
  attributeList:any=[];
  modelList:any=[];
  myFiles:string [] = [];
  selectedCatCode:any;


   category = new FormGroup({
    catName: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
    catCode: new FormControl('', [Validators.required, Validators.maxLength(25),,Validators.minLength(3)]),
    catDesc: new FormControl('',[Validators.required, Validators.maxLength(50),,Validators.minLength(3)]),
     allowBidding:new FormControl(),
    minimumAmount:new FormControl('',[Validators.min(0)])
   
  });

 
    subCategory = new FormGroup({
      parentCategory:new FormGroup({
        catCode:new FormControl('')
      }),
    catName: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
    catCode: new FormControl('', [Validators.required, Validators.maxLength(25),,Validators.minLength(3)]),
    catDesc: new FormControl('',[Validators.required, Validators.maxLength(50),,Validators.minLength(3)]),
    modelAvailable: new FormControl(''),
    models:new FormControl('')
  });
  
  catAttribute=new FormGroup({
      parentCategory:new FormGroup({
        catCode:new FormControl('')
      }),
    attributeName: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
    attributeType: new FormControl('input', [Validators.required, Validators.maxLength(25),,Validators.minLength(3)]),
    attributeValue:new FormControl('')
   
  })

  submitted:boolean=false;
  action:any='list';
  constructor(public toastr: ToastrManager,private appService : AppService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  //MEthod for getting all category on main page
  getAllCategories(){
    this.appService.getAllCategories(this.limit,this.offset).subscribe(data=>{
      
      this.categoryList=data.categoryList;
      this.count=data.count;
     
      this.action='list';
    },error=>{
      console.log('error');
    });
  }

  //Method for getting sub categories by clicking on particular category
  getAllSubCategoryAndAttributeOfCategoryCode(category){
    this.appService.getAllSubCategoryAndAttributeOfCategoryCode(category.catCode,this.limit,this.offset).subscribe(data=>{
      this.action='view';
       this.subCategoryList=data.subCategoryList;
       this.attributeList=data.attributeList;
      this.category.patchValue({
        catCode:category.catCode,
        catName:category.catName,
        catDesc:category.catDesc,
        status:category.status,
        allowBidding:category.allowBidding
      });
      this.category.disable();
      
     
    },errpr=>{
      console.log('error');
    });
  }

  //Method for adding on add category button
  addCategory(){
    this.category.reset();
    this.action='add';
    this.biddingAllowed=false;
    this.submitted=false;   
  }

  
  //Show listinng on back button
  //and reseting all forms
  backButton(){
    this.action='list';
    this.submitted=false;
     this.category.reset();
    this.category.enable();
    this.subCategory.reset();  
    this.catAttribute.reset();
    this.biddingAllowed=false;
      this.modelList=[];
    this.keyList=[];
    this.key=undefined;
    this.modelValue=undefined;
  }

  //method for adding sub category
  addSubcategory(catCode){
    this.action='addSub'
    this.subCategory.reset();  
    
    this.selectedCatCode=catCode;
    this.modelAvailable=false;
      this.modelList=[];
    this.keyList=[];
    this.modelValue=[];
    //patching parent category attribute and making it readonly
    this.subCategory.controls.parentCategory.patchValue({
      catCode:catCode
    });
   
  }

  addAttribute(catCode){
    this.action='addAttr';
    this.selected='input';
    this.catAttribute.reset();
    this.selectedCatCode=catCode;
      this.modelList=[];
    this.keyList=[];
    this.key=undefined;
    this.catAttribute.controls.parentCategory.patchValue({
      catCode:catCode
    });

  }

        showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }

  //Category form submitted
  categoryFormOnSubmit(){
    this.submitted=true;
    let catCode = this.category.controls.catCode.value;
    var alreadyAddedItem = this.categoryList.findIndex(category => {
      return category.catCode === catCode;
    });
    if (alreadyAddedItem !== -1 ) {
      this.showError('Duplicate Category code', 'Oops!');
      
    }
    else{
    if(this.category.invalid)
      {
         this.showError('Please fill all the details', 'Oops!');
      }
      else{
        const categoryData = this.category.value;
          const formData = new FormData();
      formData.append('categoryString', JSON.stringify(categoryData));
      for (var i = 0; i < this.myFiles.length; i++) { 
        formData.append("file", this.myFiles[i]);
      }

        this.appService.saveCategory(formData).subscribe(data=>{
          this.showSuccess("Category Successfully added","Success");
         this.getAllCategories();
        },error=>{
          console.log('error',error);
        });
   
      }
    }
  }

  subCategoryFormOnSubmit(){
    console.log(this.subCategory);

     let catCode = this.subCategory.controls.catCode.value;
    var alreadyAddedItem = this.subCategoryList.findIndex(subcategory => {
      return subcategory.catCode === catCode;
    });
    if (alreadyAddedItem !== -1 ) {
      this.showError('Duplicate Sub Category code', 'Oops!');
      
    }
    else{
    if(this.subCategory.invalid){
      this.showError('Please fill all the details', 'Oops!');
    }
    else{
      console.log(this.subCategory.controls.modelAvailable.value);
      if(this.subCategory.controls.modelAvailable.value==true){
        this.subCategory.controls.models.setValue(this.modelValue);
         }
      this.appService.saveSubCategory(this.subCategory.value).subscribe(data=>{
        this.getAllCategories();
        this.showSuccess("Sub Category Successfully added","Success");
      },error=>{
       this.showError('Something wrong happens', 'Oops!');
      });
    }
   this.modelList=[];
   this.modelValue=undefined;
    }
  }

  attributeFormOnSubmit(){
    this.submitted=true;
console.log('attrobute form is'+this.catAttribute);
if(this.catAttribute.invalid){
  console.log('error');
}
else{
   if(this.catAttribute.controls.attributeType.value!=='input'){
        this.catAttribute.controls.attributeValue.setValue(this.key);
         }
 this.appService.saveAttribute(this.catAttribute.value).subscribe(data=>{
        this.getAllCategories();
        this.showSuccess("Attribute Successfully added","Success");
      },error=>{
        console.log('errir');
      })
      this.keyList=[];
      this.key=undefined;
  }
}




  //Change events
      modelChange(event){
        console.log('event is'+event);
        this.modelAvailable=event;
      }

        biddingAllowedfun(event){
        this.biddingAllowed=event;
      }

      addNewModel(){
        //check for empry value
        if(this.subCategory.controls.models.value!==''){
          //check for duplicate value
         if(this.modelList.indexOf(this.subCategory.controls.models.value)==-1){
           //if first time, no comma
        if(this.modelValue==undefined || this.modelValue==''){
        this.modelValue=this.subCategory.controls.models.value;
        }
      //further comma seperated
      else{
        this.modelValue=this.modelValue+','+this.subCategory.controls.models.value;
      }
      this.modelList.push(this.subCategory.controls.models.value);
      //resetting input field
      this.subCategory.controls.models.setValue('');
       this.invalidModel=false;
         }
      else
        {
          this.showError("Duplicate Model","Oops!");
         //  this.subCategory.controls.models.setValue('');
          this.invalidModel=true;
        }
        }
    else{
      this.invalidModel=true;
    }
      }



      addNewKey(){
        //check for empry value
        if(this.catAttribute.controls.attributeValue.value!==''){
          //check for duplicate value
         if(this.keyList.indexOf(this.catAttribute.controls.attributeValue.value)==-1){
           //if first time, no comma
        if(this.key==undefined ||this.key==''){
        this.key=this.catAttribute.controls.attributeValue.value;
        }
      //further comma seperated
      else{
        this.key=this.key+','+this.catAttribute.controls.attributeValue.value;
      }
      this.keyList.push(this.catAttribute.controls.attributeValue.value);
      //resetting input field
      this.catAttribute.controls.attributeValue.setValue('');
       this.invalidKey=false;
         }
      else
        {
          this.showError("Duplicate Attribute","Oops!");
         //  this.subCategory.controls.models.setValue('');
          this.invalidKey=true;
        }
        }
    else{
      this.invalidKey=true;
    }
      }



      getSelectedAttribue(event){
       
      this.selected=event;
      }


       onKeyChange(event, controlName) {
    if (controlName === 'subCatCode') {
      this.subCategory.patchValue({
        catCode: event.target.value.toUpperCase()
      });
    }
    else {
      this.category.patchValue({
        catCode: event.target.value.toUpperCase()
      });
    }

  }

   pageChanged(event){
    this.offset=event;
    this.getAllCategories();
  }

  onSelectFile(event){
    this.myFiles=[];
   for (var i = 0; i < event.target.files.length; i++) { 
      if(event.target.files[i].size<=2048000)
      {
      this.myFiles.push(event.target.files[i]);
      }
      else{
        this.showError("Please select image less than 2MB.","Oops!");
      }
  }
  }

}
