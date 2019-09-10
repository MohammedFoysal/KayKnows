import { Injectable } from '@angular/core';
import { Family } from './family';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  families;

  constructor() {
    this.getFamilies()
  }

  getFamilies() : void {
    this.families = [
        {id: 1, label: 'Kainos', opened: true, band_id: 1,  children: [
          {id: 2, opened: false, label: 'Sales & Marketing', children: [
            {id: 3, opened: false,  label: 'grandchild1', children: []},
            {id: 4, opened: false, label: 'grandchild2', children: []}
          ]},
          {id: 5, opened: false, label: 'Technical', children: [
            {id: 7, opened: false, label: 'grandchild3'},
            {id: 8, opened: false, label: 'grandchild4', children: []}
          ]},
          {id: 6, opened: false, label: 'Consulting', children: [
            {id: 9, opened: false, label: 'grandchild7', children: []},
            {id: 10, opened: false, label: 'grandchild8', children: []}
          ]},
          {id:11, opened:false, label: 'Experience Design', children:[
          ]},
          {id:12, opened:false, label: 'Management'},
          {id:13, opened:false, label: 'Central Services Team'}
        ]}
      ];

    // this.http.get<Family[]>('/api/courses').subscribe(res => {
    //   if(res[0] == null){
    //     console.error(res);
    //   } else {
    //     this.families = res;
    //   }
    // });
  }

}
