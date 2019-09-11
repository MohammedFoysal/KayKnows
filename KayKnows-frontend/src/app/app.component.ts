import { Component } from '@angular/core';

import { DataService } from './data.service'; 
import { LogService } from './shared/log.service';

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
}
