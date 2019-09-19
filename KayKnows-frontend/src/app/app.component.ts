import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LogService } from './shared/log.service';
import { DataService } from './data.service';
import { triggerAsyncId } from 'async_hooks';
import { Capabilities } from 'protractor';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { SwitchboardService } from './switchboard.service';
import { Band } from './band';
import { TreeComponent } from './tree/tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'KayKnows-frontend';
  band: Band;
  user_full_name: String = '';

  constructor(private dataService: DataService, private logger: LogService,  private route: ActivatedRoute, private router: Router, private switchboard: SwitchboardService) { 
    logger.info('AppComponent: Successful launch');
    let localAdmin = localStorage.getItem('user_admin');
    this.dataService.isAdmin = localAdmin != null && localAdmin == '1' ? true : false;
    this.user_full_name = localStorage.getItem('user_full_name');
    this.dataService.logged_user_role_id = localStorage.getItem('user_role_id');
  }

  ngOnInit() {
  }

  onSelect(band: Band): void {
    this.band = band;
    this.switchboard.switchBand(this.band);
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
