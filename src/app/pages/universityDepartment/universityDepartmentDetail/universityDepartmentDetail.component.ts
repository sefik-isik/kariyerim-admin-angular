import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartment } from '../../../models/component/universitydepartment';

@Component({
  selector: 'app-departmentDetail',
  templateUrl: './universityDepartmentDetail.component.html',
  styleUrls: ['./universityDepartmentDetail.component.css'],
  imports: [CommonModule],
})
export class UniversityDepartmentDetailComponent implements OnInit {
  @Input() universityDepartment: UniversityDepartment;
  componentTitle: string = 'University Department Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
