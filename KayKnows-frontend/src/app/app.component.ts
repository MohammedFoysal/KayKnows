import { Component } from '@angular/core';

import { LogService } from './shared/log.service';
import { DataService } from './data.service'; 
import { Family } from './family';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'KayKnows-frontend';
  dataService: DataService;

  constructor(dataService: DataService, private logger: LogService) { 
    this.dataService = dataService;
    logger.info('AppComponent: Successful launch');
  }

  ngOnInit() {
      
  }

  checkboxChanged(event) {
    this.dataService.refreshFilters();
  }

  printData() {
    console.log(JSON.stringify(this.dataService.nestedData))
  }

}
