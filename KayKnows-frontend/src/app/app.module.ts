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

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    MoreInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService,  LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
