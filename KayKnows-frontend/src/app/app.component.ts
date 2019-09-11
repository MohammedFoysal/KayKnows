import { Component } from '@angular/core';
import { DataService } from './data.service';
import { triggerAsyncId } from 'async_hooks';
import { Capabilities } from 'protractor';
import { getLocaleExtraDayPeriodRules } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'KayKnows-frontend';
  dataService: DataService;
  data = [];
  family_ids = [3, 2];
  capability_ids = [2, 10]
  originalFlat = [
    {
      "capability_id": 1,
      "family_id": 1,
      "family_name": "Sales & Marketing",
      "capability_name": "Sales",
      "role_id": 1,
      "role_name": "Sales Director",
      "role_spec": "role spec",
      "role_description": "Description",
      "band_id": 2
    },
    {
      "capability_id": 2,
      "family_id": 2,
      "family_name": "Technical",
      "capability_name": "Software Engineering",
      "role_id": 2,
      "role_name": "Software Engineer",
      "role_spec": "role spec",
      "role_description": "Description",
      "band_id": 6
    },
    {
      "capability_id": 10,
      "family_id": 2,
      "family_name": "Technical",
      "capability_name": "Software Advanced Engineering",
      "role_id": 7,
      "role_name": "Lead Software Advanced Engineer",
      "role_spec": "role_spec",
      "role_description": "desc",
      "band_id": 3
    },
    {
      "capability_id": 3,
      "family_id": 3,
      "family_name": "Consulting",
      "capability_name": "Agile",
      "role_id": 3,
      "role_name": "Agile Lead",
      "role_spec": "role spec",
      "role_description": "Description",
      "band_id": 4
    },
    {
      "capability_id": 4,
      "family_id": 4,
      "family_name": "Experience Design",
      "capability_name": "Research",
      "role_id": 4,
      "role_name": "User Researcher",
      "role_spec": "role spec",
      "role_description": "Description",
      "band_id": 7
    },
    {
      "capability_id": 5,
      "family_id": 5,
      "family_name": "Management",
      "capability_name": "Project Management",
      "role_id": 5,
      "role_name": "Team Leader",
      "role_spec": "role spec",
      "role_description": "Description",
      "band_id": 5
    },
    {
      "capability_id": 6,
      "family_id": 6,
      "family_name": "Central Services Teams",
      "capability_name": "Travel",
      "role_id": 6,
      "role_name": "Travel Associate",
      "role_spec": "role spec",
      "role_description": "Description",
      "band_id": 7
    }
  ];

  checkboxData = [
    {family_id: 1, isSelected: false},
    {family_id: 2, isSelected: false},
    {family_id: 3, isSelected: false},
    {family_id: 4, isSelected: false},
  ]

  flat = [];

  constructor(dataService: DataService) {
    this.dataService = dataService;
    // this.data = this.getFamiliesNested();
    this.flat = this.dataService.treeDataNested;
    // this.filter();
  }

  

  // filter() {
  //   var newFlat = [];

  //   for (let i = 0; i < this.flat.length; i++) {
  //     if (this.family_ids.includes(this.flat[i].family_id)) {
  //       newFlat.push(this.flat[i]);
  //     }
  //   }

  //   let nestedData = this.getFamiliesNested(newFlat);

  //   for (var familyIndex in nestedData) {
  //     let family = nestedData[familyIndex];
      
  //     for (var capabilityIndex in family.children) {
  //       let capability = nestedData[familyIndex].children[capabilityIndex];
        
  //       if (!this.existsInFilteredCapabilities(capability, this.capability_ids)) {
  //         nestedData[familyIndex].children.splice(capabilityIndex, 1)
  //       }
  //     }
  //   }

  //   this.data = nestedData;
  // }


}
