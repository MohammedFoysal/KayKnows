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
    const token = localStorage.getItem('token');

    //Check if cached token is available, if so log them in, or disallow
    if (token && localStorage.getItem('user_id')) {

      //Check with the backend if they're still a user, if they are allow them
      // if not disallow them
      this.dataService.getLoggedInUser().subscribe({
        next: data => {
          if (data) {
            localStorage.setItem('user_id', String(data.user_id));
            localStorage.setItem('user_email', data.user_email);
            localStorage.setItem('user_full_name', data.user_full_name);
            localStorage.setItem('user_admin', String(data.user_admin));
  
            return true;    
          } else {
            return false;
          }
        },
        error: error => { 
          this.router.navigate(['/login']);
          return false;
        }
      })

      return true;

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
