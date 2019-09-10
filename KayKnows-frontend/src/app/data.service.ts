import { Injectable } from '@angular/core';
import { Family } from './family';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  families;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.getFamilies()
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

}
