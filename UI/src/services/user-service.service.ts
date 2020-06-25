import { JwtServiceService } from './jwt-service.service';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { ApiService } from 'services/api.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  constructor(private jwtService:JwtServiceService,
              private apiService:ApiService, private router: Router
  ) { }

  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  //Response we are getting is accessToken and tokenType which are not presesnt in user class

  setAuth(user: User) {
    console.log('user us'+JSON.stringify(user));
   
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);

    this.saveUser(user);
  }

  // setAuth(user) {
  //   console.log(user.accessToken);
  //   // Save JWT sent from server in localstorage
  //   this.jwtService.saveToken(user.accessToken);
  //   // Set current user data into observable
  //   this.currentUserSubject.next(user.accessToken);
  //   // Set isAuthenticated to true
  //   this.isAuthenticatedSubject.next(true);
  // }

  logout(){
    console.log('logout');
    this.purgeAuth();
    
     this.router.navigate(['/home']);
//
  }
    
  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    this.destroyUser();
  }

attemptAuth(type, credentials): Observable<User>
 {
    const route ='/login';
    return this.apiService.post('/api/auth' + route, credentials).pipe(
      map(data => {
        this.setAuth(data);
        
        return data;
      }
    ));
  }

attempiSignUp(credentials){
  const route ='/signup';
  return this.apiService.post('/api/auth' + route, credentials).pipe(
    map(data => {
      return data;
    }
  ));
 }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  getUser(): string {
    return window.localStorage['user'];
}
destroyUser(){
   window.localStorage.removeItem('user');
}
saveUser(user){
  window.localStorage['user'] = JSON.stringify(user);
}
  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data['user']);
      return data['user'];
    }));
  }
}
