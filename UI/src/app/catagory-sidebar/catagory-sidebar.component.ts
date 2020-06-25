import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { FormGroup,ReactiveFormsModule } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { DataServiceService } from 'services/data-service.service';

@Component({
  selector: 'app-catagory-sidebar',
  templateUrl: './catagory-sidebar.component.html',
  styleUrls: ['./catagory-sidebar.component.scss']
})
export class CatagorySidebarComponent implements OnInit {

  imageUrl = this.appService.BaseUrl+"/downloadFile/";
  constructor(private appService:AppService,
    private data: DataServiceService) { }
  public limit=15;
  public offset=1;
  categoryListWithCount:any=[];
  categoryCount:any=[];
  ngOnInit() {
    this.getAllCategoryWithCount()
  }
  performSearch(catid){
    this.data.changePOC(true);
    this.data.changeCatID(catid);
  }
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
