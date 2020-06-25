import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'services/user-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataServiceService } from 'services/data-service.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path:'/admin/category',title:'Category',icon:'bubble_chart',class:''},
    { path: '/admin/addproduct', title: 'Add a product',  icon:'unarchive', class: '' },   
    // { path: '/admin/reportedads', title: 'Reported Ads',  icon:'notifications', class: '' },
    { path: '/admin/allProduct', title: 'Manage Products',  icon:'content_paste', class: '' },
    { path: '/admin/closedDeals', title: 'Closed Deals', icon: 'highlight_off' , class:''},
    { path: '/admin/users', title: 'All Users', icon: 'supervised_user_circle' , class:''},
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor( private userService: UserServiceService,
    private toastr: ToastrManager,
    private data: DataServiceService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  showSuccess(msg, title) {
    this.toastr.successToastr(msg, 'Success!');
  }

  showError(msg, title) {
    this.toastr.errorToastr(msg, title);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }

  logout(){
    this.showSuccess("You have been logged out.", "Success");
    this.userService.logout();
    this.data.changeLoginStatusManually(false);
     //window.location.reload();
  }
}

//  { path: '/admin/uphoto', title: 'UPLOAD PHOTO',  icon:'unarchive', class: '' },
//     { path: '/admin/user-profile', title: 'User Profile',  icon:'person', class: '' },
//     { path: '/admin/typography', title: 'Typography',  icon:'library_books', class: '' },
//     { path: '/admin/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//     { path: '/admin/maps', title: 'Maps',  icon:'location_on', class: '' },
//     { path: '/admin/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//     { path: '/admin/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: '' },