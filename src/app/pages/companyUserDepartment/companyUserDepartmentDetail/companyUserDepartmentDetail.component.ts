import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';

@Component({
  selector: 'app-companyUserDepartmentDetail',
  templateUrl: './companyUserDepartmentDetail.component.html',
  styleUrls: ['./companyUserDepartmentDetail.component.css'],
  imports: [CommonModule],
})
export class CompanyUserDepartmentDetailComponent implements OnInit {
  @Input() companyUserDepartment: CompanyUserDepartment;
  componentTitle: string = 'Company User Department Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
