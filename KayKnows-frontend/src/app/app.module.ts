import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service'
import { TreeComponent } from './tree/tree.component';
import { LogService } from './shared/log.service';
import { MoreInformationComponent } from './more-information/more-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ConfirmComponent } from './confirm/confirm.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    MoreInformationComponent,
    LandingComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [ConfirmComponent],
  providers: [DataService,  LogService],
  bootstrap: [LandingComponent],
  entryComponents: [ConfirmComponent],
})
export class AppModule { }
