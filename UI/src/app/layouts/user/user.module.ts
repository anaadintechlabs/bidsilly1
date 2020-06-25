import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { WishListComponent } from '../../wish-list/wish-list.component';
import { UserRoutingModule } from './user-routing.module';
import { AllProductsComponent } from '../../all-products/all-products.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSlideToggleModule
} from '@angular/material';
import { SplitkeyPipe } from "app/splitkey.pipe";
import { SignleProductViewComponent } from 'app/signle-product-view/signle-product-view.component';
import { OtherUserViewComponent } from 'app/other-user-view/other-user-view.component';
import { DatePipe } from "@angular/common";
import { CatagorySidebarComponent } from 'app/catagory-sidebar/catagory-sidebar.component';
import { HomepageComponent } from 'app/homepage/homepage.component';
import { HomesliderComponent } from 'app/sharedcomponents/homeslider/homeslider.component';
import { SidebarComponent } from 'app/components/sidebar/sidebar.component';
import { SearchbarComponent } from 'app/searchbar/searchbar.component';
import { SharedModule } from "app/layouts/shared/shared.module";
import { CountDown } from 'ng2-date-countdown';
import { ViewAllProductComponent } from 'app/view-all-product/view-all-product.component';
import { MyadsComponent } from 'app/myads/myads.component';
import { AllBidsOfUserComponent } from 'app/all-bids-of-user/all-bids-of-user.component';
import { StaticContentComponent } from 'app/static-content/static-content.component';
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";
import { EditProfileComponent } from "app/edit-profile/edit-profile.component";
import { SettingsComponent } from "app/settings/settings.component";
import { AllBidsOfProductsComponent } from "app/all-bids-of-products/all-bids-of-products.component";
import { ProductDashboardComponent } from 'app/product-dashboard/product-dashboard.component';

@NgModule({
  imports: [
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
    MatSlideToggleModule,
     ReactiveFormsModule,
      ToastrModule.forRoot(),
      SharedModule,
      NgxPaginationModule
  ],
  declarations: [WishListComponent,
    AllProductsComponent,
    OtherUserViewComponent, 
    SignleProductViewComponent,
  CatagorySidebarComponent,
  HomepageComponent,
  HomesliderComponent,
  CountDown, 
SearchbarComponent,
ViewAllProductComponent,
MyadsComponent,
AllBidsOfUserComponent,
StaticContentComponent,
EditProfileComponent,
SettingsComponent,
AllBidsOfProductsComponent,
ProductDashboardComponent
],
    providers:[DatePipe]
})
export class UserModule { }
