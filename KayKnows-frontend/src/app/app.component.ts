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
  family_ids = [1, 3, 2];
  capability_ids = [1, 2]
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
      "capability_id": 2,
      "family_id": 2,
      "family_name": "Technical",
      "capability_name": "Software Engineering",
      "role_id": 7,
      "role_name": "Lead Software Engineer",
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

  flat = this.originalFlat;

  constructor(dataService: DataService) {
    this.dataService = dataService;
    // this.data = this.getFamiliesNested();
    this.filter();
  }

  filter() {
    var newFlat = [];

    for (let i = 0; i < this.flat.length; i++) {
      if (this.family_ids.includes(this.flat[i].family_id)) {
        newFlat.push(this.flat[i]);
      }
    }

    let nestedData = this.getFamiliesNested(newFlat);

    for (var familyIndex in nestedData) {
      let family = nestedData[familyIndex];
      
      for (var capabilityIndex in family.children) {
        let capability = nestedData[familyIndex].children[capabilityIndex];
        
        if (!this.existsInFilteredCapabilities(capability, this.capability_ids)) {
          nestedData[familyIndex].children.splice(capabilityIndex, 1)
        }

        console.log(capability)
      }
    }

    this.data = nestedData;
    // console.log(nestedData);



    // this.data = newFlat;
    // this.data = this.getFamiliesNested();
    // console.log(this.data);
    // this.data.filter(function(obj) {
    //   return this.familyIdExists(obj, this.family_ids);
    // });
  }

  existsInFilteredCapabilities(capability, capability_ids) {
    for (let i = 0; i < capability_ids.length; i++) {
      if (capability.capability_id === capability_ids[i]) {
        return true;
      }
    }

    return false;
  }

  getFamiliesNested(flatData) {
    var families = [];
    var capabilities = [];
    var roles = [];

    flatData.forEach(square => {
      if (!this.familyExists(square, families)) {
        families.push({
          family_id: square.family_id,
          family_name: square.family_name,
          label: square.family_name,
          opened: false
        });
      }

      if (!this.capabilityExists(square, capabilities)) {
        capabilities.push({
          capability_id: square.capability_id,
          capability_name: square.capability_name,
          label: square.capability_name,
          family_id: square.family_id,
          opened: false
        })
      }

      if (!this.roleExists(square, roles)) {
        roles.push({
          role_id: square.role_id,
          role_name: square.role_name,
          label: square.role_name,
          band_id: square.band_id,
          capability_id: square.capability_id,
          family_id: square.family_id,
          opened: false
        })
      }
    });

    // console.log(families);
    // console.log(capabilities);
    // console.log(roles);

    capabilities.forEach(capability => {
      capability.children = this.getRolesForCapability(capability.capability_id, roles);
    })

    families.forEach(family => {
      family.children = this.getCapabilitiesForFamily(family.family_id, capabilities);
    })

    return families;
  }

  getRolesForCapability(capability_id, roles) {
    return roles.filter(function (role) {
      return role.capability_id === capability_id;
    }).sort(function (role, roleTwo) {
      return role.band_id - roleTwo.band_id;
    });
  }

  getCapabilitiesForFamily(family_id, capabilities) {
    return capabilities.filter(function (capability) {
      return capability.family_id === family_id;
    });
  }

  familyExists(family, families) {
    for (let i = 0; i < families.length; i++) {
      if (families[i].family_id === family.family_id) {
        return true;
      }
    }

    return false;
  }

  familyIdExists(family, family_ids) {
    for (let i = 0; i < family_ids.length; i++) {
      if (family_ids[i] === family.family_id) {
        return true;
      }
    }

    return false;
  }

  capabilityExists(capability, capabilities) {
    for (let i = 0; i < capabilities.length; i++) {
      if (capabilities[i].capability_id === capability.capability_id) {
        return true;
      }
    }

    return false;
  }

  roleExists(role, roles) {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].role_id === role.role_id) {
        return true;
      }
    }

    return false;
  }
}
