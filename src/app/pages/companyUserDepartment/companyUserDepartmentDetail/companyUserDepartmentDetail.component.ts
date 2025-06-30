import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserDepartmentDTO } from '../../../models/dto/companyUserDepartmentDTO';

@Component({
  selector: 'app-companyUserDepartmentDetail',
  templateUrl: './companyUserDepartmentDetail.component.html',
  styleUrls: ['./companyUserDepartmentDetail.component.css'],
  imports: [CommonModule],
})
export class CompanyUserDepartmentDetailComponent implements OnInit {
  @Input() companyUserDepartmentDTO: CompanyUserDepartmentDTO;
  componentTitle: string = 'Company User Department Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
