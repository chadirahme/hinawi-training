import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { Auth } from 'aws-amplify';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async login(username: string, password: string) {
    localStorage.clear();
    return await Auth.signIn(username, password)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        localStorage.setItem('token', 'JWT');
        this.isLoginSubject.next(true);

        //return user.signInUserSession;
        return true;
      }).catch(err => {
        console.log(err);
        //throw(err);
        return err.message;
      });
  }

  async login1(username: string, password: string) {
    try {
      var user = await Auth.signIn(username, password);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);

      var tokens = user.signInUserSession;
      console.log('User tokens>> ' + tokens);

      localStorage.setItem('token', 'JWT');
      this.isLoginSubject.next(true);

      return user;
    }catch (error) {
      throw (error);
    }


    // return Auth.signIn(username, password)
    //   .pipe(map(user => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.currentUserSubject.next(user);
    //     return user;
    //   }));
  }

  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(null);
  // }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout() : void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
    this.router.navigate(['home']);
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  private hasToken() : boolean {
    return !!localStorage.getItem('token');
  }

}
