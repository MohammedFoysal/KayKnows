import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',  component: AppComponent, canActivate: [AuthGuard] , pathMatch: 'full' },  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
