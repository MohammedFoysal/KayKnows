import { DataService } from '../data.service';
import { SwitchboardService } from '../switchboard.service';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Family } from '../family';
import { Capability } from '../capability';
import { CapabilityLead } from '../capability-lead';
import { User } from '../user';
import { Role } from '../role';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.8s ease-in')
      ]),
      transition(':leave', [
        animate('0.8s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})


export class MoreInformationComponent implements OnInit, OnDestroy {
  switchboard: SwitchboardService;
  subFamily: Subscription;
  subCapability: Subscription;
  subRole: Subscription;
  subCapabilityLead: Subscription;
  selected: string;
  family: Family;
  capability: Capability;
  capability_lead: CapabilityLead;
  role: Role;
  role_description: string[];
  show: boolean;
  buttonName:string = 'Show';

  constructor(switchboard: SwitchboardService) { this.switchboard = switchboard }

  createBulletList(description: string): string[]{
    console.log(description.split("|"));
    return description.split("|");
  }

  ngOnInit() : void {
    this.subFamily = this.switchboard.family$.subscribe((f) => {
      this.family = f;
      this.selected = "family";
      this.show = true;
    });
    this.subCapability = this.switchboard.capability$.subscribe((c) => {
      this.capability = c;
      console.log(c);
      this.selected = "capability";
      this.show = true;
    });
    this.subCapabilityLead = this.switchboard.capability_lead$.subscribe((capability_lead) => {
      this.capability_lead = capability_lead;
      console.log(capability_lead);
    });
    this.subRole = this.switchboard.role$.subscribe((role) => {
      this.role = role;
      this.role_description = this.createBulletList(role.role_description);
      this.selected = "role";
      console.log("role", this.role);
      this.show = true;
    })
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
    this.subCapability.unsubscribe();
    this.subCapabilityLead.unsubscribe();
    this.subRole.unsubscribe();
  }
}
