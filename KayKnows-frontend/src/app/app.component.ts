import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'KayKnows-frontend';

  data = [
    {id: 1, label: 'somethinbg', opened: true, children: [
      {id: 2, opened: false, label: 'child1', children: [
        {id: 3, opened: false,  label: 'grandchild1', children: []},
        {id: 4, opened: false, label: 'grandchild2', children: []}
      ]},
      {id: 5, opened: false, label: 'child2', children: [
        {id: 7, opened: false, label: 'grandchild3', children: []},
        {id: 8, opened: false, label: 'grandchild4', children: []}
      ]},
      {id: 6, opened: false, label: 'child3', children: [
        {id: 9, opened: false, label: 'grandchild7', children: []},
        {id: 10, opened: false, label: 'grandchild8', children: []}
      ]},
    ]}
  ];
}
