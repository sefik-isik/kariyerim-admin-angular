import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserFileDTO } from '../../../models/dto/companyUserFileDTO';

@Component({
  selector: 'app-companyUserFileDetail',
  templateUrl: './companyUserFileDetail.component.html',
  styleUrls: ['./companyUserFileDetail.component.css'],
  imports: [CommonModule],
})
export class CompanyUserFileDetailComponent implements OnInit {
  @Input() companyUserFileDTO: CompanyUserFileDTO;
  componentTitle: string = 'Company User File Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
