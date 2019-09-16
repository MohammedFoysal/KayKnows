import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service'
import { TreeComponent } from './tree/tree.component';
import { LogService } from './shared/log.service';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    LandingComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService,  LogService],
  bootstrap: [LandingComponent]
})
export class AppModule { }
