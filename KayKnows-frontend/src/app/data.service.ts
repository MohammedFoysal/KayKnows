import {Injectable} from '@angular/core';
import {Family} from './family';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  real_checkbox_data: any[];
  http: HttpClient;
  flatData = [];
  nestedData = [];
  familyIds = [];
  capabilityIds = [];


  constructor(http: HttpClient) {
    this.http = http;
    this.loadTree();
  }

  loadTree(): void {
    this.getCheckboxData();
    this.getTreeData();
  }

  getTreeData(): void {
    this.http.get<Family[]>('/api/all').subscribe(res => {
      if (res[0] == null) {
        console.error(res);
      } else {
        this.flatData = res;
        this.treeDataNested(this.flatData);
      }
    });
  }

  getCheckboxData() {
    this.http.get<Family[]>('/api/family-filters').subscribe(res => {
      if (res[0] == null) {
        console.error(res);
      } else {
        this.real_checkbox_data = res;
        this.refreshFilters();
      }
    });
  }

  addFamily(newFamily: Family): Observable<Family> {
    return this.http.post<Family>('/api/add-family', newFamily).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const msg = {
      code: undefined,
      message: undefined
    };
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      msg.message = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      msg.code = error.status;
      msg.message = error.error.message;
    }
    // return an observable with a user-facing error message
    return throwError(msg);
  }

  refreshFilters() {
    var selectedFamilies = this.real_checkbox_data.filter(function (family) {
      return family.isSelected;
    });

    this.familyIds = selectedFamilies.map(
      family => family.family_id
    );

    var tempCapabilityIds = [];

    for (const selectedFamily of selectedFamilies) {
      for (const capability of selectedFamily.capabilities) {
        if (capability.isSelected) {
          tempCapabilityIds.push(capability.capability_id);
        }
      }
    }

    this.capabilityIds = tempCapabilityIds;

    this.treeDataNested(this.flatData);
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
      type: 'family',
      opened: this.familyIds.includes(data.family_id)
    };
  }

  makeCapability(data) {
    return {
      capability_id: data.capability_id,
      capability_name: data.capability_name,
      label: data.capability_name,
      family_id: data.family_id,
      type: 'capability',
      opened: this.capabilityIds.includes(data.capability_id)
    };
  }

  makeRole(data) {
    return {
      role_id: data.role_id,
      role_name: data.role_name,
      label: data.role_name,
      band_id: data.band_id,
      band_name: data.band_name,
      capability_id: data.capability_id,
      family_id: data.family_id,
      type: 'role',
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
