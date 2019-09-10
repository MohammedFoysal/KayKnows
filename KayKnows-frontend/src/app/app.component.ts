import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'KayKnows-frontend';
  dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }
  data = [
    {id: 1, label: 'Kainos', opened: true, children: [
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
}
