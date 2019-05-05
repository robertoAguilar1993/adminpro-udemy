import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styles: []
})
export class TablesComponent implements OnInit {


  datos: any = [
    {
    name: 'Tiger Nixon',
    position: 'System Architect',
    office: 'Edinburgh',
    age: '61',
    start: '2011/04/25',
    salary: '$320,800'
  },
  {
    name: 'Tiger Nixon',
    position: 'System Architect',
    office: 'Edinburgh',
    age: '61',
    start: '2011/04/25',
    salary: '$320,800'
  },
  {
    name: 'Tiger Nixon',
    position: 'System Architect',
    office: 'Edinburgh',
    age: '61',
    start: '2011/04/25',
    salary: '$320,800'
  },
  {
    name: 'Tiger Nixon',
    position: 'System Architect',
    office: 'Edinburgh',
    age: '61',
    start: '2011/04/25',
    salary: '$320,800'
  }
];

  constructor() {
    console.log(this.datos);
  }

  ngOnInit() {
  }

}
