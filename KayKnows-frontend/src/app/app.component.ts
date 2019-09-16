import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LogService } from './shared/log.service';
import { DataService } from './data.service';
import { triggerAsyncId } from 'async_hooks';
import { Capabilities } from 'protractor';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { SwitchboardService } from './switchboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'KayKnows-frontend';
  dataService: DataService;
  isAdmin: Boolean = false;
  isViewingAsAdmin: Boolean = false;

  constructor(dataService: DataService, private logger: LogService,  private route: ActivatedRoute, private router: Router, switchboard: SwitchboardService) { 
    this.dataService = dataService;
    logger.info('AppComponent: Successful launch');
  }

  ngOnInit() {
      let localAdmin = localStorage.getItem('user_admin');
      this.isAdmin = localAdmin != null && localAdmin == '1' ? true : false;
  }

  checkboxChanged(event) {
    this.dataService.refreshFilters();
  }

  logout() {
    this.dataService.logout()
    this.router.navigate(['/login']);
  }

  printData() {
    console.log(JSON.stringify(this.dataService.nestedData))
  }

  

}
