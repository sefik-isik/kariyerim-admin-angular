import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAddressDTO } from '../../../models/CompanyUserAddressDTO';

@Component({
  selector: 'app-companyUserAddressDetail',
  templateUrl: './companyUserAddressDetail.component.html',
  styleUrls: ['./companyUserAddressDetail.component.css'],
  imports: [CommonModule],
})
export class CompanyUserAddressDetailComponent implements OnInit {
  @Input() companyUserAddressDTO: CompanyUserAddressDTO;
  componentTitle: string = 'Company User Address Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
