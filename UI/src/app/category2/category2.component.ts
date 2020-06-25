import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-category2',
  templateUrl: './category2.component.html',
  styleUrls: ['./category2.component.scss']
})
export class Category2Component implements OnInit {

  public action:string="addCat"

  public limit=15;
  public offset=0;
  categoryList:any=[];
  myFiles:string [] = [];
  public biddingAllowed:boolean=false;

  selectedCatCode:any;
  modelList:any=[];
  subCategoryList: any=[];
  public modelValue:any;
  public  modelAvailable:boolean=false;
  key: string;
  keyList: any = [];
  invalidModel: boolean;
  invalidKey: boolean;
  selected:string;
  attributeList:any=[];
  public url = this.appService.imageUrl;

  category = new FormGroup({
    catName: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
    catDesc: new FormControl('',[Validators.required, Validators.maxLength(50),,Validators.minLength(3)]),
     allowBidding:new FormControl(),
    minimumAmount:new FormControl('',[Validators.min(0)])
   
  });
  subCategory = new FormGroup({
    parentCategory:new FormGroup({
      catCode:new FormControl('')
    }),
  catName: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
  catDesc: new FormControl('',[Validators.required, Validators.maxLength(50),,Validators.minLength(3)]),
  modelAvailable: new FormControl(''),
  models:new FormControl('')
});
catAttribute=new FormGroup({
  parentCategory:new FormGroup({
    catCode:new FormControl('')
  }),
attributeName: new FormControl('', [Validators.required]),
attributeType: new FormControl('input', [Validators.required]),
typeForInput : new FormControl(''),
attributeValue:new FormControl('')

});

  constructor(private appService: AppService,
    private toastr : ToastrManager) { }

  ngOnInit() {
    this.getAllCategories();
  }
  categoryFormOnSubmit(){
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
         this.category.reset();
        },error=>{
          console.log('error',error);
        });
   
      }
  }

  subCategoryFormOnSubmit(){
    console.log(this.subCategory);

    //  let catCode = this.subCategory.controls.catCode.value;
    // var alreadyAddedItem = this.subCategoryList.findIndex(subcategory => {
    //   return subcategory.catCode === catCode;
    // });
    // if (alreadyAddedItem !== -1 ) {
    //   this.showError('Duplicate Sub Category code', 'Oops!');
      
    // }
    // else{
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
        this.subCategory.reset();
        this.showSuccess("Sub Category Successfully added","Success");
      },error=>{
       this.showError('Something wrong happens', 'Oops!');
      });
    }
   this.modelList=[];
   this.modelValue=undefined;
    // }
  }
  attributeFormOnSubmit(){
    console.log('attrobute form is'+this.catAttribute.value);
    if(this.catAttribute.invalid){
     console.log('error');
    }
    else{
        if(this.catAttribute.controls.attributeType.value!=='input'){
          this.catAttribute.controls.attributeValue.setValue(this.key);
         }
        this.appService.saveAttribute(this.catAttribute.value).subscribe(data=>{
        this.getAllCategories();
        this.catAttribute.reset();
        this.showSuccess("Attribute Successfully added","Success");
      },error=>{
        console.log('errir');
      })
      this.keyList=[];
      this.key=undefined;
    }
  }

  getSelectedAttribue(event){ 
    this.selected=event;
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
  modelChange(event){
    console.log('event is'+event);
    this.modelAvailable=event;
  }
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
  biddingAllowedfun(event){
    this.biddingAllowed=event;
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
      console.log(this.categoryList);
    },error=>{
      console.log('error');
    });
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
      else{
        this.showError("Duplicate Model","Oops!");
        //  this.subCategory.controls.models.setValue('');
        this.invalidModel=true;
        }
      }
    else{
      this.invalidModel=true;
    }
  }
  getAllSubcategory(catCode){
    this.appService.getAllSubCategoryWithCatId(this.limit,this.offset,catCode).subscribe(data=>{
      this.subCategoryList=data.subCategoryList;
      console.log(this.subCategoryList);
    })
  }
  addAttribute(catCode){
    this.action='addAttr';
    this.catAttribute.reset();
    this.selectedCatCode=catCode;
      this.modelList=[];
    this.keyList=[];
    this.key=undefined;
    this.catAttribute.controls.parentCategory.patchValue({
      catCode:catCode
    });

  }
  getTypeOfInput(value){
    this.catAttribute.controls.typeForInput.patchValue({
      typeForInput:value
    })
  }
  addCategory(){
    this.action="addCat";
  }

  deleteCategory(catCode,inUse)
  {
   
  if(!inUse)
    {
      this.appService.deleteCategory(catCode).subscribe(data=>{
        this.showSuccess("Category deleted  Successfully","Success");
        this.getAllCategories();
        this.subCategoryList=[];
      },error=>{
        this.showError("Sorry can not delete category!","Oops");
      })
    }
    else{
     this.showError("Can not delete category as it is already in use","Oops!"); 
    }
  }

   deleteSubCategory(catCode,inUse)
  {
   
  if(!inUse)
    {
      this.appService.deleteSubCategory(catCode).subscribe(data=>{
        this.showSuccess("Sub Category deleted  Successfully","Success");
        this.getAllCategories();
        this.subCategoryList=[];
      },error=>{
        this.showError("Sorry can not delete Sub category!","Oops");
      })
    }
    else{
     this.showError("Can not delete Sub category as it is already in use","Oops!"); 
    }
  }

  getAllAttr(catCode){
    this.appService.getAllAttributeOfSubCategoryCode(catCode,this.limit,this.offset).subscribe(data=>{    
      this.attributeList=data.attributeList;
      this.action="showAttr";
    });
  }

}

