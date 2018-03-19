import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss']
})
export class MedicalRecordComponent implements OnInit {

  constructor() { }

  nodes = [
    {
      name: '传染病',
      id: 0,
      children: [
        { name: '犬瘟热', id: 0 },
        { name: '犬细小病毒', id: 1 },
        { name: '犬传染性肝炎', id: 2}
      ],
      isExpanded: false
    },
    {
      name: '寄生虫病',
      id: 1,
      children: [
        { name: '蛔虫病', id: 0},
        { name: '钩虫病', id: 1 }
      ],
      isExpanded: false
    },
    { name: '内科' , 
      id: 2,
      children: [
        { name: '口炎', id: 0 },
        { name: '肠炎', id: 1 }
    ],
    isExpanded: false
    }
  ];

  currentRecord: object;

  showDetail = (parent, child) => {
    console.log(parent, child);
    this.currentRecord = child;
  }

  ngOnInit() {
    this.currentRecord = {
      "name": null
    };
  }

}