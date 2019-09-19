import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Family } from './family'
import { CapabilityLead } from './capability-lead';
import { DataService } from './data.service';
import { Capability } from './capability';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class SwitchboardService {
  private family_watcher = new Subject<Family>();
  private capability_watcher = new Subject<Capability>();
  private capability_lead_watcher = new Subject<CapabilityLead>();
  private role_watcher = new Subject<Role>();
  public family$ = this.family_watcher.asObservable();
  public capability$ = this.capability_watcher.asObservable();
  public capability_lead$ = this.capability_lead_watcher.asObservable();
  public role$ = this.role_watcher.asObservable();

  dataService: DataService;
  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  public switchFamily(family: Family){
    this.family_watcher.next(family);
  }

  public switchCapability(capability: Capability){
    this.capability_watcher.next(capability);
  }

  public switchCapabilityLead(capability_id: number){
    this.dataService.getCapabilityLeadForCapability(capability_id).subscribe(res => {
      if (res[0] == null) {
       console.error(res);
       this.capability_lead_watcher.next();
     } else {
        this.capability_lead_watcher.next(res[0]);
     }});
  }

  public switchRole(role_id: number){
    this.dataService.getRoleById(role_id).subscribe(res => {
      if (res[0] == null) {
       console.error(res);
     } else {
       this.role_watcher.next(res[0]);
     }});
  }

}
