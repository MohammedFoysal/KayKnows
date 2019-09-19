import {Component, OnInit, ViewChild} from '@angular/core';
import {Family} from '../family';
import {DataService} from '../data.service';
import {Role} from '../role';
import {Capability} from '../capability';
import {Band} from '../band';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';


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
  public newRole: Role;
  newCapability: Capability;
  public newBand: Band;
  newFamily: Family;
  showSuccess = false;
  // Will store and provide the binding for any errors from the database
  serverError: '';

  families: Family[];

  familyForm = new FormGroup({
    familyName: new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  // Capability Form Controls
  capabilityForm = new FormGroup({
    capabilityName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    familyId: new FormControl('', [Validators.required]) // Tie this into the family ids
  });

  constructor(private dataService: DataService) {
    dataService.getFamilies().subscribe({
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
    this.newCapability = new Capability();
  }

  getFamilyErrorMessage() {
    return this.familyForm.get('familyName').hasError('required') ? 'Please enter a job family name' :
      this.familyForm.get('familyName').hasError('maxlength') ? 'Job family name must be less than 100 characters' :
        '';
  }

  getCapabilityNameErrorMessage() {
    return this.capabilityForm.get('capabilityName').hasError('required') ? 'Please enter a capability name' :
      this.capabilityForm.get('capabilityName').hasError('maxlength') ? 'Capability name must be less than 100 characters'
        : '';
  }

  detectInput() {
    this.serverError = '';
  }

  onSuccess(control: FormGroup) {
    control.reset();
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
            this.onSuccess(this.capabilityForm);
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

  addCapability(addForm): void {
    if (addForm.valid) {
      const capabilityToAdd = this.newCapability;
      this.dataService.addCapability(capabilityToAdd).subscribe({
        next: res => {
          this.dataService.loadTree();
          this.onSuccess(this.capabilityForm);
          this.newCapability = new Capability();
        },
        error: err => {
          this.serverError = err.message;
        }
      });
    } else {
      console.error('Add Capability form is in an invalid state');
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
  */
}
