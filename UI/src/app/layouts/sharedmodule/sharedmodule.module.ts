import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from "app/products/add-product/add-product.component";
import { FormsModule } from "@angular/forms";

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
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ng6-toastr-notifications';
import { DatePipe } from "@angular/common";
import { UserRoutingModule } from "app/layouts/user/user-routing.module";
import { SplitkeyPipe } from "app/splitkey.pipe";
import { HomepageComponent } from "app/homepage/homepage.component";
import { HomesliderComponent } from "app/sharedcomponents/homeslider/homeslider.component";
import { CatagorySidebarComponent } from "app/catagory-sidebar/catagory-sidebar.component";
import { SearchbarComponent } from "app/searchbar/searchbar.component";
import { AllProductsComponent } from "app/all-products/all-products.component";
import { WishListComponent } from "app/wish-list/wish-list.component";
import { SignleProductViewComponent } from "app/signle-product-view/signle-product-view.component";
import { OtherUserViewComponent } from "app/other-user-view/other-user-view.component";
@NgModule({
  declarations: [AddProductComponent,SplitkeyPipe,HomepageComponent,
   CatagorySidebarComponent,
  HomepageComponent,
  HomesliderComponent,
  AllProductsComponent,
SearchbarComponent,
WishListComponent,
SignleProductViewComponent,
OtherUserViewComponent],

  imports: [
    CommonModule,
     CommonModule,
    FormsModule,
    UserRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
     ReactiveFormsModule,
      ToastrModule.forRoot(),
      
  ],
  exports:[AddProductComponent,SplitkeyPipe],
   providers:[DatePipe]
})
export class SharedmoduleModule { }
