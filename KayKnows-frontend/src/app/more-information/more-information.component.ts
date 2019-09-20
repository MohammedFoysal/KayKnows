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
import { Band } from '../band';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  subBand: Subscription;
  selected: string;
  family: Family;
  capability: Capability;
  capability_lead: CapabilityLead;
  role: Role;
  role_description: string[];
  showRoleSpec: boolean = false;
  show: boolean;
  editFields: boolean = false;
  buttonName:string = 'Show';
  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  band: Band;
  band_competencies: string[];
  band_responsibilities: string[];
  sub_list_competencies: string[][];

  role_model = { role_id: -1, role_name: '', role_spec: '', role_description: '', capability_id: -1, family_id: -1, band_id: -1, band_order: -1};
  family_model = { family_id: -1, family_name: '', capabilities: [], isSelected: false};
  editRoleForm = new FormGroup({
    role_name: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    role_description: new FormControl('', [
    ]),
    role_spec: new FormControl('', [
      Validators.maxLength(500)
    ])
   });
   editFamilyForm = new FormGroup({
    family_name: new FormControl(this.family_model.family_name, [
      Validators.required,
      Validators.maxLength(100)
    ])
   });
  constructor(private dataService: DataService, switchboard: SwitchboardService, private dialog: MatDialog, private snackBar: MatSnackBar) { 
    this.switchboard = switchboard 
  }

  createBulletList(description: string): string[]{
    return description.split("|");
  }

  createSubBulletList(description: string): string[]{
    let split = description.split(';');
    split.shift(); // Remove the first element
    return split;
  }

  createListTitle(description: string): string{
    return description.split(';')[0];
  }

  ngOnInit() : void {
    this.subFamily = this.switchboard.family$.subscribe((f) => {
      this.family = f;
      console.log(this.family);
      this.selected = "family";
      this.show = true;
      this.family_model.family_id = this.family.family_id;
      this.family_model.family_name = f.family_name;
      this.family_model.capabilities = f.capabilities;
      this.family_model.isSelected = f.isSelected;
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
      this.role_model.role_id = role.role_id;
      this.role_model.role_name = this.role.role_name;
      this.role_model.role_description = this.role.role_description;
      this.role_model.role_spec = this.role.role_spec;
      this.role_model.capability_id = this.role.capability_id;
      this.role_model.family_id = this.role.family_id;
      this.role_model.band_id = this.role.band_id;
      this.role_model.band_order = this.role.band_order;
      this.role_description = this.createBulletList(this.role_model.role_description);
      this.selected = "role";
      this.showRoleSpec = role.role_spec.length != 0;
      this.show = true;
    });
    this.subBand = this.switchboard.band$.subscribe((band) =>{
      this.band = band;
      this.band_competencies = this.createBulletList(band.band_competencies);
      this.band_responsibilities = this.createBulletList(band.band_responsibilities);
      this.selected = "band";
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
    this.subCapability.unsubscribe();
    this.subCapabilityLead.unsubscribe();
    this.subRole.unsubscribe();
    this.subBand.unsubscribe();
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

  showEditFields(){
    this.editFields = !this.editFields;
  }

  updateRole(){
    console.log(this.role_model);
    this.dataService.updateRole(this.role_model);
    this.role_description = this.createBulletList(this.role_model.role_description);
    this.dataService.loadTree();
    this.editFields = false;
  }

  updateFamily(){
    console.log("this shouldn't happen!");
    this.dataService.updateFamily(this.family_model);
    this.dataService.loadTree();
    this.editFields = false;
  }

  showRemoveFamilyDialog() {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent, {hasBackdrop: true, data: {
      title: 'Are you sure you want to delete the family?'
    }});

    this.confirmDialogRef.afterClosed().subscribe(data => {
      if (data.confirmed) {
        this.removeFamily();
      }
    });
  }

  showRemoveBandDialog() {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent, {hasBackdrop: true, data: {
      title: 'Are you sure you want to delete the band?'
    }});

    this.confirmDialogRef.afterClosed().subscribe(data => {
      if (data.confirmed) {
        this.removeBand();
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

  removeFamily() {
    if (this.family) {
      this.dataService.removeFamily(this.family.family_id).subscribe({
        next: response => { 
          this.dataService.getCheckboxData();
          this.dataService.getTreeData();
          this.dataService.getBands(); 
          this.toggle();
          this.family = null;

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

  removeBand() {
    if (this.band) {
      this.dataService.removeBand(this.band.band_id).subscribe({
        next: response => { 
          this.dataService.getCheckboxData();
          this.dataService.getTreeData();
          this.dataService.getBands(); 
          this.toggle();
          this.band = null;

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
