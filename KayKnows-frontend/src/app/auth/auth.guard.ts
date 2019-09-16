import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private dataService: DataService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.checkLogin();
  }

  checkLogin() {
    let token = localStorage.getItem('token');
    if (token && localStorage.getItem('user_id')) {

      this.dataService.getLoggedInUser(function (data, error) {
        if (data != null) {
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('user_email', data.user_email);
          localStorage.setItem('user_full_name', data.user_full_name);
          localStorage.setItem('user_admin', data.user_admin);

          return true;          
        } else {
          console.error(error);
          return false;
        }
      });

      return true;

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
