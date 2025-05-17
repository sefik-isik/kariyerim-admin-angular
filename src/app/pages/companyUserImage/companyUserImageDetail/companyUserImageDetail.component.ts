import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserImageDTO } from '../../../models/companyUserImageDTO';

@Component({
  selector: 'app-companyUserImageDetail',
  templateUrl: './companyUserImageDetail.component.html',
  styleUrls: ['./companyUserImageDetail.component.css'],
  imports: [CommonModule],
})
export class CompanyUserImageDetailComponent implements OnInit {
  @Input() companyUserImageDTO: CompanyUserImageDTO;
  componentTitle: string = 'Company User Image Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
