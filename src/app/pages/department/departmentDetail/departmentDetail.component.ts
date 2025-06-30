import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../models/component/department';

@Component({
  selector: 'app-departmentDetail',
  templateUrl: './departmentDetail.component.html',
  styleUrls: ['./departmentDetail.component.css'],
  imports: [CommonModule],
})
export class DepartmentDetailComponent implements OnInit {
  @Input() department: Department;
  componentTitle: string = 'Department Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
