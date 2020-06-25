import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AdminAllProductComponent } from 'app/admin-all-product/admin-all-product.component';
import {NgxPaginationModule} from 'ngx-pagination';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';
import { CategoryComponent } from "app/category/category.component";
import { AddProductComponent } from "app/products/add-product/add-product.component";
import { UphotoComponent } from "app/products/uphoto/uphoto.component";
import { ReportedadsComponent } from "app/reportedads/reportedads.component";

import { SharedModule } from "app/layouts/shared/shared.module";
import { SingleProductViewAdminComponent } from 'app/single-product-view-admin/single-product-view-admin.component';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { Category2Component } from 'app/category2/category2.component';
import { CloseddealComponent } from "app/closeddeal/closeddeal.component";
import { AdminAllProduct2Component } from 'app/admin-all-product2/admin-all-product2.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
     ReactiveFormsModule,
      ToastrModule.forRoot(),
      NgxPaginationModule,
      SharedModule
  ],
  declarations: [
    DashboardComponent,
    CategoryComponent,
    
    ReportedadsComponent,
    UphotoComponent,
    AdminAllProductComponent,
    SingleProductViewAdminComponent,
    UserProfileComponent,
    Category2Component,
    CloseddealComponent,
    AdminAllProduct2Component,
  
     
  ],
   
})

export class AdminLayoutModule {}
