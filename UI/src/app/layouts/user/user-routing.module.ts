import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WishListComponent } from 'app/wish-list/wish-list.component';
import { AllProductsComponent } from 'app/all-products/all-products.component';
import { UserComponent } from './user.component';
import { AddProductComponent } from "app/products/add-product/add-product.component";
import { SignleProductViewComponent } from 'app/signle-product-view/signle-product-view.component';
import { OtherUserViewComponent } from 'app/other-user-view/other-user-view.component';
import { CatagorySidebarComponent } from 'app/catagory-sidebar/catagory-sidebar.component';
import { HomepageComponent } from 'app/homepage/homepage.component';
// import { LoginComponent } from 'app/login/login.component';
import { ViewAllProductComponent } from 'app/view-all-product/view-all-product.component';
import { MyadsComponent } from 'app/myads/myads.component';
import { AllBidsOfUserComponent } from 'app/all-bids-of-user/all-bids-of-user.component';
import { StaticContentComponent } from 'app/static-content/static-content.component';
import { EditProfileComponent } from "app/edit-profile/edit-profile.component";
import { SettingsComponent } from "app/settings/settings.component";
import { AllBidsOfProductsComponent } from "app/all-bids-of-products/all-bids-of-products.component";
import { ProductDashboardComponent } from "app/product-dashboard/product-dashboard.component"
import { UserGuardGuard } from "services/user-guard.guard";

const routes: Routes =[

  //for admin sub module 
  {
    path: '',
    // redirectTo: 'homepage',
    // pathMatch: 'full',
    component: HomepageComponent
  },
  // {
  //   path: 'homepage',
  //   component : HomepageComponent,
  // },

  {
    //No auth guard for this
    path:'allProducts',
    component:ViewAllProductComponent,
  } ,
  {
    path: 'wishlist',
    component: WishListComponent,
    canActivate:[UserGuardGuard]
 },
  {
     //No auth guard for this
    path: 'sell',
    component: AddProductComponent
 },
 {
    //No auth guard for this
   path:'productView',
   component: SignleProductViewComponent
 },
 {
    path:'userview',
    component: OtherUserViewComponent,
 },
    //For guest its component and sub module routing
   {
     path:'category',
     component: CatagorySidebarComponent,
   },

    { path: 'editProfile', component: EditProfileComponent , canActivate:[UserGuardGuard]},
    { path: 'setting', component: SettingsComponent, canActivate:[UserGuardGuard] },

   {
     path: 'myads',
     component: MyadsComponent,
      canActivate:[UserGuardGuard]
   },
    {
     path: 'showallbids',
     component: AllBidsOfProductsComponent,
      canActivate:[UserGuardGuard]
   },

   
   {
     path: 'myBids',
     component: AllBidsOfUserComponent,

   },
   {
     path: 'static',
     component: StaticContentComponent,
      canActivate:[UserGuardGuard]
   },
   {
     path : 'userDashboard',
     component : ProductDashboardComponent,
      canActivate:[UserGuardGuard]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UserRoutingModule { }
