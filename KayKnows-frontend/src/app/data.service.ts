import {Injectable} from '@angular/core';
import { Band } from './band';
import {CapabilityLead} from './capability-lead';
import { User } from './user';
import { Role } from './role';
import { Family } from './family';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from './auth-response';
import { KayKnowsResponse } from './kay-knows-response';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Capability } from './capability';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  real_checkbox_data: any[];
  flatData = [];
  nestedData = [];
  familyIds = [];
  capabilityIds = [];
  searchQuery = '';
  bands: Band[] = [];
  isAdmin: Boolean = false;
  logged_user_role_id;
  isViewingAsAdmin: Boolean = false;

  constructor(private http: HttpClient) {

  }

  loadTree(): void {
    let localAdmin = localStorage.getItem('user_admin');
    let token = localStorage.getItem('token');
    this.isAdmin = localAdmin != null && localAdmin == '1'
    this.logged_user_role_id = localStorage.getItem('user_role_id');

    this.getCheckboxData();
    this.getTreeData();
    this.getBands();
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

  getUser(user_id: number): Observable<User>{
    return this.http.get<User>("/api/users/"+ user_id);
  }

  getCapabilityLeadForCapability(capability_id: number): Observable<CapabilityLead> {
    return this.http.get<CapabilityLead>("/api/capability-leads/" + capability_id);
  }

  getRoleById(role_id: number): Observable<Role>{
    return this.http.get<Role>("/api/roles/" + role_id);
  }

  getCheckboxData() {
    const token = `Bearer ${localStorage.getItem('token')}`
    const headers = new HttpHeaders().set('Authorization', token);
    
    let query = '';
    if (this.searchQuery) {
      query = this.searchQuery;
    }

    this.http.get<Family[]>('/api/family-filters/' + query, {headers}).subscribe(res => {
      if (res[0] == null) {
        console.error(res);
      } else {
        this.real_checkbox_data = res;
        this.refreshFilters();
      }
    });
  }

  getBands() {
    this.http.get<Band[]>('/api/bands').subscribe(res => {
      if (res[0] == null) {
        console.error(res);
      } else {
        this.bands = res;
      }

    });
  }

  updateRole(updatedRole: Role): void{
    console.log(updatedRole);
    this.http.put<Role>('/api/edit/role', updatedRole).subscribe(res => {
      if (res[0] == null) {
        console.error(res);
      }
    });
  }
  
  login(data): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/login', data);
  }

  register(data): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/register', data);
  }

  removeCapability(capability_id): Observable<KayKnowsResponse> {
    const token = `Bearer ${localStorage.getItem('token')}`
    const headers = new HttpHeaders().set('Authorization', token);

    return this.http.delete<KayKnowsResponse>('/api/capability/' + capability_id, {headers});
  }

  removeRole(role_id): Observable<KayKnowsResponse> {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const headers = new HttpHeaders().set('Authorization', token);

    return this.http.delete<KayKnowsResponse>('/api/role/' + role_id, {headers});
  }

  removeFamily(family_id): Observable<KayKnowsResponse> {
    const token = `Bearer ${localStorage.getItem('token')}`
    const headers = new HttpHeaders().set('Authorization', token);

    return this.http.delete<KayKnowsResponse>('/api/family/' + family_id, {headers});
  }

  removeBand(band_id): Observable<KayKnowsResponse> {
    const token = `Bearer ${localStorage.getItem('token')}`
    const headers = new HttpHeaders().set('Authorization', token);

    return this.http.delete<KayKnowsResponse>('/api/band/' + band_id, {headers});
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_admin');
    localStorage.removeItem('user_full_name');
  }

  getLoggedInUser(): Observable<User> {
    const token = `Bearer ${localStorage.getItem('token')}`
    const headers = new HttpHeaders().set('Authorization', token);

    return this.http.get<User>('/api/me', {headers});
  }

  getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>('/api/families').pipe(catchError(this.handleError));
  }

  addFamily(newFamily: Family): Observable<Family> {
    const token = `Bearer ${localStorage.getItem('token')}`
    const headers = new HttpHeaders().set('Authorization', token);

    return this.http.post<Family>('/api/add-family', newFamily, {headers}).pipe(catchError(this.handleError));
  }

  addRole(newRole: Role): Observable<Role> {
    return this.http.post<Role>('/api/add-role', newRole).pipe(catchError(this.handleError));
  }

  getCapabilities(): Observable<Capability[]> {
    return this.http.get<Capability[]>('/api/capabilities').pipe(catchError(this.handleError));
  }

  getBandNames(): Observable<Band[]> {
    return this.http.get<Band[]>('/api/bands').pipe(catchError(this.handleError));
  }

  addCapability(capability: Capability): Observable<Capability> {
    return this.http.post<Capability>('/api/add-capability', capability).pipe(catchError(this.handleError));
  }

  addCapabilityLead(leadToAdd: CapabilityLead): Observable<CapabilityLead> {
    return this.http.post<CapabilityLead>('/api/add-cap-lead', leadToAdd).pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(catchError(this.handleError));
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
    const users = [];

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
      const children = this.getRolesForCapability(capability.capability_id, roles);
      if (children[0] !== undefined) {
        capability.children = children;
      }
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
      label: data.family_name,
      type: 'family',
      opened: this.familyIds.includes(data.family_id)
    };
  }

  makeCapability(data) {
    return {
      capability_id: data.capability_id,
      label: data.capability_name,
      family_id: data.family_id,
      type: 'capability',
      opened: this.capabilityIds.includes(data.capability_id)
    };
  }

  makeRole(data) {
    let role = {
      role_id: data.role_id,
      label: data.role_name,
      band_id: data.band_id,
      band_name: data.band_name,
      band_colour: data.band_colour,
      band_order: data.band_order,
      capability_id: data.capability_id,
      family_id: data.family_id,
      type: 'role',
      is_important: false,
      opened: true
    };

    if (this.logged_user_role_id && role.role_id == this.logged_user_role_id) {
      role.is_important = true;
    }

    return role;
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
      return role.band_order - roleTwo.band_order;
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
    if (role.role_id === null) {
      return true; // ignore me I'm a ghost role
    }

    for (const r of roles) {
      if (r.role_id === role.role_id) {
        return true;
      }
    }

    return false;
  }

  updateFamily(updatedFamily: Family) {
    this.http.put<Role>('/api/edit/family', updatedFamily).subscribe(res => {
      if (res[0] == null) {
        console.error(res);
      }
    });
  }
}
