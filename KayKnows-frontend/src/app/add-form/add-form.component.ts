import { Component, OnInit, ViewChild } from '@angular/core';
import { Family } from '../family';
import { DataService } from '../data.service';
import { Role } from '../role';
import { Capability } from '../capability';
import { Band } from '../band';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';


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
  options = ['Role', 'Capability', 'Band', 'Job Family'];
  capabilities: Capability[];
  bands: Band[];
  newRole: Role;
  newCapability: Capability;
  newBand: Band;
  newFamily: Family;
  showSuccess = false;
  // Will store and provide the binding for any errors from the database
  serverError: '';

  familyForm = new FormGroup({
    familyName:new FormControl('', [Validators.required, Validators.maxLength(100)])
  })
  
  roleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    capabilityId: new FormControl('', [Validators.required]),
    bandId: new FormControl('', [Validators.required]),
    roleSpec: new FormControl('', [Validators.maxLength(500)]),
    roleDescription: new FormControl('', [ Validators.maxLength(65000)])
  });

  //role_name = new FormControl('', [Validators.required, Validators.maxLength(100)]);

  constructor(private dataService: DataService) {
    dataService.getCapabilities().subscribe(res => {
      console.log(res);
      this.capabilities = res;
    })

    dataService.getBandNames().subscribe(res => {
      console.log(res);
      this.bands = res;
    })
  }

  ngOnInit() {
    this.newFamily = new Family();
    this.newRole = new Role();
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
 
  detectInput() {
    this.serverError = '';
  }

  onSuccess(control: FormGroup, form: NgForm) {
    control.reset();
    form.resetForm();
    this.showSuccess = true;
    this.FadeOutLink();
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

  /*
  addRole(addForm): void {
    if (addForm.valid) {
      var roleToAdd = this.newRole;
      this.newRole = new Role();
      this.data.addRole(roleToAdd);
      window.location.reload();
      //this.data.getTreeData();    How do we reload the page!?!?
    } else {
      console.error("Add Role form is in an invalid state");
    }
  }

  addBand(addForm): void {
    if (addForm.valid) {
      var bandToAdd = this.newBand;
      this.newBand = new Band();
      this.data.addBand(bandToAdd);
      window.location.reload();
      //this.data.getTreeData();    How do we reload the page!?!?
    } else {
      console.error("Add Band form is in an invalid state");
    }
  }

  addCapability(addForm): void {
    if (addForm.valid) {
      var capabilityToAdd = this.newCapability;
      this.newCapability = new Capability();
      this.data.addCapability(capabilityToAdd);
      window.location.reload();
      //this.data.getTreeData();    How do we reload the page!?!?
    } else {
      console.error("Add Capability form is in an invalid state");
    }
  }
  */
}
