import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserDTO } from '../../../models/companyUserDTO';

@Component({
  selector: 'app-companyUserDetail',
  templateUrl: './companyUserDetail.component.html',
  styleUrls: ['./companyUserDetail.component.css'],
  imports: [CommonModule],
})
export class CompanyUserDetailComponent implements OnInit {
  @Input() companyUserDTO: CompanyUserDTO;
  componentTitle: string = 'Company User Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
