import {Injectable} from '@angular/core';
import {Family} from './family';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  families;
  http: HttpClient;
  nestedData = [];
  // Manual filtering
  familyIds = [1, 2, 3, 4, 5, 6, 7, 8];
  capabilityIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  constructor(http: HttpClient) {
    this.http = http;
    this.getFamilies();
    this.getTreeData();
  }

  getFamilies(): void {
    this.http.get<Family[]>('/api/families').subscribe(res => {
      if (res[0] == null) {
        console.error(res);
      } else {
        this.families = res;
      }
    });
  }

  getTreeData(): void {
    this.http.get<Family[]>('/api/all').subscribe(res => {
      if (res[0] == null) {
        console.error(res);
      } else {
        this.treeDataNested(res);
      }
    });
  }

  treeDataNested(flatData) {
    let newFlat: any[];
    const families = [];
    const capabilities = [];
    const roles = [];


    for (const element of flatData) {
      // Extract Families
      if (this.familyIds.includes(element.family_id)) {
        if (!this.familyExists(element, families)) {
          families.push(this.makeFamily(element));
        }
      }

      // Extract Capabilities
      if (this.capabilityIds.includes(element.capability_id)) {
        if (!this.capabilityExists(element, capabilities)) {
          capabilities.push(this.makeCapability(element));
        }
      }

      // Extract Roles
      if (!this.roleExists(element, roles)) {
        roles.push(this.makeRole(element));
      }
    }

    capabilities.forEach(capability => {
      capability.children = this.getRolesForCapability(capability.capability_id, roles);
    });

    families.forEach(family => {
      family.children = this.getCapabilitiesForFamily(family.family_id, capabilities);
    });

    newFlat = [...families];

    console.log(newFlat);

    this.nestedData = newFlat;

    return newFlat;
  }

  existsInFilteredCapabilities(capability, capabilityIds) {
    for (const id of capabilityIds) {
      if (capability.capability_id === id) {
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
      opened: this.familyIds.includes(data.family_id)
    };
  }

  makeCapability(data) {
    return {
      capability_id: data.capability_id,
      capability_name: data.capability_name,
      label: data.capability_name,
      family_id: data.family_id,
      opened: this.capabilityIds.includes(data.capability_id)
    };
  }

  makeRole(data) {
    return {
      role_id: data.role_id,
      role_name: data.role_name,
      label: data.role_name,
      band_id: data.band_id,
      capability_id: data.capability_id,
      family_id: data.family_id,
      opened: true
    };
  }

  getFamiliesNested(flatData) {
    const families = [];
    const capabilities = [];
    const roles = [];

    flatData.forEach(square => {
      if (!this.familyExists(square, families)) {
        families.push(this.makeFamily(square));
      }

      if (!this.capabilityExists(square, capabilities)) {
        capabilities.push(this.makeCapability(square));
      }

      if (!this.roleExists(square, roles)) {
        roles.push(this.makeRole(square));
      }
    });

    capabilities.forEach(capability => {
      capability.children = this.getRolesForCapability(capability.capability_id, roles);
    });

    families.forEach(family => {
      family.children = this.getCapabilitiesForFamily(family.family_id, capabilities);
    });

    return families;
  }

  getRolesForCapability(capabilityId, roles) {
    // Get the correct roles and sort them
    const sortedRoles = roles.filter(role => {
      return role.capability_id === capabilityId;
    }).sort((role, roleTwo) => {
      return role.band_id - roleTwo.band_id;
    });

    // now make the roles children of each other
    const top = [sortedRoles[0]];
    let previous = null;
    for (const role of sortedRoles) {
      if (previous !== null) {
        previous.children = [role];
      }
      previous = role;
    }

    return top;
  }

  getCapabilitiesForFamily(familyId, capabilities) {
    const filtered = capabilities.filter(capability => {
      return capability.family_id === familyId;
    });

    return filtered.reduce((unique, item) => unique.capability_id === item.capability_id ? unique : [...unique, item], []);
  }

  familyExists(family, families) {
    for (const fam of families) {
      if (fam.family_id === family.family_id) {
        return true;
      }
    }

    return false;
  }

  familyIdExists(family, familyIds) {
    for (const id of familyIds) {
      if (id === family.family_id) {
        return true;
      }
    }

    return false;
  }

  capabilityExists(capability, capabilities) {
    for (const cap of capabilities) {
      if (cap.capability_id === capability.capability_id) {
        return true;
      }
    }

    return false;
  }

  roleExists(role, roles) {
    for (const r of roles) {
      if (r.role_id === role.role_id) {
        return true;
      }
    }

    return false;
  }

}
