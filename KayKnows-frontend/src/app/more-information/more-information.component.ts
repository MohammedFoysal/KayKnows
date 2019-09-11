import { DataService } from '../data.service';
import { SwitchboardService } from '../switchboard.service';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Family } from '../family';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.css']
})

export class MoreInformationComponent implements OnInit, OnDestroy {
  switchboard: SwitchboardService;
  subFamily: Subscription;
  family: Family;
  show: Boolean;
  buttonName:any = 'Show';
  constructor(switchboard: SwitchboardService) { this.switchboard = switchboard }

  ngOnInit() : void {
    this.subFamily = this.switchboard.family$.subscribe((f) => {
      this.family = f;
      this.show = true;
    });
  }

  toggle(){
    this.show = !this.show;

    if(this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  ngOnDestroy(): void {
    this.subFamily.unsubscribe();
  }
}
