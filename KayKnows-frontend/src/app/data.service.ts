import { Injectable } from '@angular/core';
import { Family } from './family';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  families;
  http: HttpClient;
  treeData = [];
  family_ids = [3, 2];
  capability_ids = [2, 7];

  constructor(http: HttpClient) {
    this.http = http;
    this.getFamilies();
    this.getTreeData();
  }

  getFamilies() : void {
    // this.families = [
    //   {id: 1, label: 'httyp data', opened: true, children: [
    //     {id: 2, opened: false, label: 'child1', children: [
    //       {id: 3, opened: false,  label: 'grandchild1', children: []},
    //       {id: 4, opened: false, label: 'grandchild2', children: []}
    //     ]},
    //     {id: 5, opened: false, label: 'child2', children: [
    //       {id: 7, opened: false, label: 'grandchild3', children: []},
    //       {id: 8, opened: false, label: 'grandchild4', children: []}
    //     ]},
    //     {id: 6, opened: false, label: 'child3', children: [
    //       {id: 9, opened: false, label: 'grandchild7', children: []},
    //       {id: 10, opened: false, label: 'grandchild8', children: []}
    //     ]},
    //   ]}
    // ];

    this.http.get<Family[]>('/api/families').subscribe(res => {
      if(res[0] == null){
        console.error(res);
      } else {
        this.families = res;
      }
    });
  }

  getTreeData(): void {
    this.http.get<Family[]>('/api/all').subscribe(res => {
      if(res[0] == null){
        console.error(res);
      } else {
        this.treeData = res;
      }
    });
  }

  get treeDataNested() {
    var newFlat = [];
    var families = [];
    var capabilities = [];
    var roles = [];


    for (let i = 0; i < this.treeData.length; i++) {
      let element = this.treeData[i];

      //Extract Families
      if (this.family_ids.includes(element.family_id)) {
        if (!this.familyExists(element, families)) {
          families.push(this.makeFamily(element));
        }        
      }

      //Extract Capabilities
      if (this.capability_ids.includes(element.capability_id)) {
        if (!this.capabilityExists(element, capabilities)) {        
          capabilities.push(this.makeCapability(element));
        }
      }

      //Extract Roles
      if (!this.roleExists(element, roles)) {
        roles.push(this.makeRole(element));
      }
    }
    
    capabilities.forEach(capability => {
      capability.children = this.getRolesForCapability(capability.capability_id, roles);
    })

    families.forEach(family => {
      family.children = this.getCapabilitiesForFamily(family.family_id, capabilities);
    })

    newFlat = [...families]

    console.log(newFlat);

    return newFlat;
  }

  existsInFilteredCapabilities(capability, capability_ids) {
    for (let i = 0; i < capability_ids.length; i++) {
      if (capability.capability_id === capability_ids[i]) {
        return true;
      }
    }

    return false;
  }

  makeFamily(data) {
    return {
      family_id: data.family_id,
      family_name: data.family_name,
      label: data.family_name,
      opened: this.family_ids.includes(data.family_id)
    };
  }

  makeCapability(data) {
    return {
      capability_id: data.capability_id,
      capability_name: data.capability_name,
      label: data.capability_name,
      family_id: data.family_id,
      opened: this.capability_ids.includes(data.capability_id)
    }
  }

  makeRole(data) {
    return {
      role_id: data.role_id,
      role_name: data.role_name,
      label: data.role_name,
      band_id: data.band_id,
      capability_id: data.capability_id,
      family_id: data.family_id,
      opened: this.capability_ids.includes(data.capability_id)
    }
  }

  getFamiliesNested(flatData) {
    var families = [];
    var capabilities = [];
    var roles = [];

    flatData.forEach(square => {
      if (!this.familyExists(square, families)) {
        families.push(this.makeFamily(square));
      }

      if (!this.capabilityExists(square, capabilities)) {
        capabilities.push(this.makeCapability(square))
      }

      if (!this.roleExists(square, roles)) {
        roles.push(this.makeRole(square))
      }
    });

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
    var capabilities = capabilities.filter(function (capability) {
      return capability.family_id === family_id;
    });

    return capabilities.reduce((unique, item) => unique.capability_id == item.capability_id ? unique : [...unique, item], []);
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
