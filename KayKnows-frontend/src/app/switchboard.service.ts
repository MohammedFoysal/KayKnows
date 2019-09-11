import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Family } from './family'
import { CapabilityLead } from './capability-lead';

@Injectable({
  providedIn: 'root'
})
export class SwitchboardService {
  private familyWatcher = new Subject<Family>();
  private capabilityWatcher = new Subject<CapabilityLead>();
  public family$ = this.familyWatcher.asObservable();
  constructor() { }

  public switchFamily(family: Family){
    if(family){
      this.familyWatcher.next(family);
    }
  }

  public switchCapabilityLead(capabilityLead: CapabilityLead){
    if(capabilityLead){
      this.capabilityWatcher.next(capabilityLead);
    }
  }

}
