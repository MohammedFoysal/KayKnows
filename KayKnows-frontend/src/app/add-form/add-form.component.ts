import { Component, OnInit, ViewChild } from '@angular/core';
import { Family } from '../family';
import { DataService } from '../data.service';
import { Role } from '../role';
import { Capability } from '../capability';
import { Band } from '../band';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {CapabilityLead} from "../capability-lead";
import {User} from "../user";
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(1000)),
  ]), ]

})
export class AddFormComponent implements OnInit {

  selected = '';
  options = ['Role', 'Capability', 'Job Family'];
  families: Family[];
  capabilities: Capability[];
  bands: Band[];
  users: User[];
  newRole: Role;
  newCapability: Capability;
  newCapLead: CapabilityLead;
  newFamily: Family;
  showSuccess = false;
  // Will store and provide the binding for any errors from the database
  serverError: '';
  
  roleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    capabilityId: new FormControl('', [Validators.required]),
    bandId: new FormControl('', [Validators.required]),
    roleSpec: new FormControl('', [Validators.maxLength(500)]),
    roleDescription: new FormControl('', [ Validators.maxLength(65000)])
  });

  familyForm = new FormGroup({
    familyName: new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  // Capability Form Controls
  capabilityForm = new FormGroup({
    capabilityName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    familyId: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.maxLength(300)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(500)])
  });

  constructor(private dataService: DataService) {
    this.reload(); 
  }

  reload(){
    this.dataService.getCapabilities().subscribe({
      next : res => {
      this.capabilities = res;
      },
      error: err => {
        this.serverError = err.message;
      }
    });

    this.dataService.getUsers().subscribe({
      next : res => {
        this.users = res;
      },
      error: err => {
        this.serverError = err.message;
      }
    });

    this.dataService.getBandNames().subscribe({
      next : res => {
        this.bands = res;
      },
      error: err => {
        this.serverError = err.message;
      }
    });

    this.dataService.getFamilies().subscribe({
      next: res => {
        this.families = res;
      },
      error: err => {
        this.serverError = err.message;
      }
    });
  }


  ngOnInit() {
    this.newFamily = new Family();
    this.newRole = new Role();
    this.newCapability = new Capability();
    this.newCapLead = new CapabilityLead();
  }

  getFamilyErrorMessage() {
    return this.familyForm.get('familyName').hasError('required') ? 'Please enter a job family name' :
      this.familyForm.get('familyName').hasError('maxlength') ? 'Job family name must be less than 100 characters' :
        '';
  }

  getRoleNameErrorMessage() {
    return this.roleForm.get('roleName').hasError('required') ? 'Please enter a role name' :
      this.roleForm.get('roleName').hasError('maxlength') ? 'Role name must be less than 100 characters' :
        '';
  }

  getRoleSpecErrorMessage() {
      return this.roleForm.get('roleSpec').hasError('maxlength') ? 'Role specification must be less than 500 characters' :
        '';
  }

  getRoleCapabilityErrorMessage() {
      return this.roleForm.get('capabilityId').hasError('required') ? 'Please select a capability' :
        '';
  }

  getRoleBandErrorMessage() {
      return this.roleForm.get('bandId').hasError('required') ? 'Please select a band' :
       '';
  }

  getCapabilityNameErrorMessage() {
    return this.capabilityForm.get('capabilityName').hasError('required') ? 'Please enter a capability name' :
      this.capabilityForm.get('capabilityName').hasError('maxlength') ? 'Capability name must be less than 100 characters'
        : '';
  }

  getCapabilityFamilyIdErrorMessage() {
    return this.capabilityForm.get('familyId').hasError('required') ? 'Please select a family' :
      '';
}

  getUserIdMessage() {
    return this.capabilityForm.get('userId').hasError('required') ? 'Please select a user' :
      '';
  }

  getPhotoMessage() {
    return this.capabilityForm.get('photo').hasError('maxlength') ? 'The photo url must be no longer than 300 characters' : '';
  }

  getMessageMessage() {
    return this.capabilityForm.get('message').hasError('required') ? 'A message is required' :
      this.capabilityForm.get('message').hasError('maxlength') ? 'The message can be no longer than 500 characters' : '';
  }

  detectInput() {
    this.serverError = '';
  }

  onSuccess(control: FormGroup, form: NgForm) {
    control.reset();
    form.resetForm();
    this.showSuccess = true;
    this.FadeOutLink();
    this.reload();
  }

  FadeOutLink() {
    setTimeout(() => {
      this.showSuccess = false;
    }, 2000);
  }

  addFamily(addForm): void {
    if (addForm.valid) {
      const familyToAdd = this.newFamily;
      this.dataService.addFamily(familyToAdd).subscribe({
          next: res => {
            this.dataService.loadTree();
            this.onSuccess(this.familyForm, addForm);
            this.newFamily = new Family();
          },
          error: err => {
            this.serverError = err.message;
          }
        }
      );
    } else {
      console.error('Add Family form is in an invalid state');
    }
  }

  addRole(addForm): void {
    if (addForm.valid) {
      const roleToAdd = this.newRole;
      this.dataService.addRole(roleToAdd).subscribe({
          next: res => {
            this.dataService.loadTree();
            this.onSuccess(this.roleForm, addForm);
            this.newRole = new Role();
          },
          error: err => {
            this.serverError = err.message;
          }
        }
      );
    } else {
      console.error('Add Role form is in an invalid state');
    }
  }
  
  addCapability(addForm): void {
    if (addForm.valid) {
      const capabilityToAdd = this.newCapability;
      const leadToAdd = this.newCapLead;
      this.dataService.addCapability(capabilityToAdd).subscribe({
        next: res => {
          leadToAdd.capability_id = res.capability_id;
          this.dataService.addCapabilityLead(leadToAdd).subscribe({
            next: result => {
              this.dataService.loadTree();
              this.onSuccess(this.capabilityForm, addForm);
              this.newCapability = new Capability();
              this.newCapLead = new CapabilityLead();
            },
            error: err => {
              this.serverError = err.message;
            }
          });
        },
        error: err => {
          this.serverError = err.message;
        }
      });
    } else {
      console.error('Add Capability form is in an invalid state');
    }
  }
}
