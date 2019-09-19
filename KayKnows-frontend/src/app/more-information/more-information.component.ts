import { DataService } from '../data.service';
import { SwitchboardService } from '../switchboard.service';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Family } from '../family';
import { Capability } from '../capability';
import { CapabilityLead } from '../capability-lead';
import { Role } from '../role';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  showRoleSpec: boolean = false;
  show: boolean;
  buttonName:string = 'Show';
  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  constructor(private dataService: DataService, switchboard: SwitchboardService, private dialog: MatDialog, private snackBar: MatSnackBar) { 
    this.switchboard = switchboard 
  }

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
      this.selected = "capability";
      this.show = true;
    });
    this.subCapabilityLead = this.switchboard.capability_lead$.subscribe((capability_lead) => {
      this.capability_lead = capability_lead;
    });
    this.subRole = this.switchboard.role$.subscribe((role) => {
      this.role = role;
      this.role_description = this.createBulletList(role.role_description);
      this.selected = "role";
      this.showRoleSpec = role.role_spec.length != 0;
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

  showRemoveCapabilityDialog() {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent, {hasBackdrop: true, data: {
      title: 'Are you sure you want to delete the capability?'
    }});

    this.confirmDialogRef.afterClosed().subscribe(data => {
      if (data.confirmed) {
        this.removeCapability();
      }
    });
  }

  showRemoveRoleDialog() {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent, {hasBackdrop: true, data: {
      title: 'Are you sure you want to delete the role?'
    }});

    this.confirmDialogRef.afterClosed().subscribe(data => {
      if (data.confirmed) {
        this.removeRole();
      }
    });
  }

  removeCapability() {
    if (this.capability) {
      this.dataService.removeCapability(this.capability.capability_id).subscribe({
        next: response => { 
          this.dataService.getCheckboxData();
          this.dataService.getTreeData();
          this.dataService.getBands(); 
          this.toggle();
          this.capability = null;

          this.snackBar.open(response.message, "OK", {
            duration: 5000
          });
        },
        error: error => {
          this.snackBar.open(error.error.message, "OK", {
            duration: 5000
          });

          console.log(error)
        }
      });
    }
  }

  removeRole() {
    if (this.role) {
      this.dataService.removeRole(this.role.role_id).subscribe({
        next: response => { 
          this.dataService.getCheckboxData();
          this.dataService.getTreeData();
          this.dataService.getBands(); 
          this.toggle();
          this.role = null;

          this.snackBar.open(response.message, "OK", {
            duration: 5000
          });
        },
        error: error => {
          this.snackBar.open(error.error.message, "OK", {
            duration: 5000
          });

          console.log(error)
        }
      });
    }
  }
}
