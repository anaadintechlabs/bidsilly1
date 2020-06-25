import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CategoryComponent } from "app/category/category.component";
import { ReportedadsComponent } from "app/reportedads/reportedads.component";
import { AddProductComponent } from "app/products/add-product/add-product.component";
import {UphotoComponent} from "app/products/uphoto/uphoto.component";
import { AdminAllProductComponent } from 'app/admin-all-product/admin-all-product.component';
import { SingleProductViewAdminComponent } from 'app/single-product-view-admin/single-product-view-admin.component';
import { Component } from '@angular/core';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { Category2Component } from 'app/category2/category2.component';
import { CloseddealComponent } from "app/closeddeal/closeddeal.component";
import { AdminAllProduct2Component } from 'app/admin-all-product2/admin-all-product2.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    // { path: 'category',      component: CategoryComponent },
    {path:'reportedads' , component:ReportedadsComponent},
    {path:'addproduct',component:AddProductComponent},  
    { path: 'allProducts',    component: AdminAllProductComponent},
    { path: 'productView',    component: SingleProductViewAdminComponent},
    { path: '',      component: DashboardComponent },
    { path: 'users',      component: UserProfileComponent },
    { path : 'category', component : Category2Component },
    { path : 'closedDeals', component : CloseddealComponent },
    { path: 'allProduct', component: AdminAllProduct2Component },
    

];

