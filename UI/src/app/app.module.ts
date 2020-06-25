import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AgmCoreModule} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ReportedadsComponent } from './reportedads/reportedads.component';
import { SplitkeyPipe } from './splitkey.pipe';
import { GuestComponent } from "app/layouts/guest/guest.component";
import { IndexnavbarComponent } from './sharedcomponents/indexnavbar/indexnavbar.component';
import { HomeNavbarComponent } from './sharedcomponents/home-navbar/home-navbar.component';
import { UserComponent } from "app/layouts/user/user.component";
import { ToastrModule } from 'ng6-toastr-notifications';
import { FooterComponent } from './sharedcomponents/footer/footer.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserServiceService } from 'services/user-service.service';
import { HttpTokenInterceptorService } from 'services/http-token-interceptor.service';
import { ApiService } from 'services/api.service';
import { JwtServiceService } from 'services/jwt-service.service';
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
import { HeaderComponent } from './header/header.component';
import { Login2Component } from './login2/login2.component';
import { SharedmoduleModule } from './layouts/sharedmodule/sharedmodule.module';
import { SharedModule } from './layouts/shared/shared.module';
import { CloseddealComponent } from './closeddeal/closeddeal.component';
import { SettingsComponent } from './settings/settings.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  imports: [
    MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    SharedModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    GuestComponent,
    IndexnavbarComponent,
    HomeNavbarComponent,
    UserComponent,
    FooterComponent,
    HeaderComponent,
    Login2Component,        
  ],
  providers: [ {provide:HTTP_INTERCEPTORS, useClass: HttpTokenInterceptorService, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
      ApiService,
      UserServiceService,
      JwtServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
