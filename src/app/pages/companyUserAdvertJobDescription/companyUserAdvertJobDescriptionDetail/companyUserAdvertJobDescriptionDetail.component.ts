import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAdvertJobDescriptionDTO } from '../../../models/dto/companyUserAdvertJobDescriptionDTO';

@Component({
  selector: 'app-companyUserAdvertJobDescriptionDetail',
  templateUrl: './companyUserAdvertJobDescriptionDetail.component.html',
  styleUrls: ['./companyUserAdvertJobDescriptionDetail.component.css'],
  imports: [CommonModule],
})
export class CompanyUserAdvertJobDescriptionDetailComponent implements OnInit {
  @Input()
  companyUserAdvertJobDescriptionDTO: CompanyUserAdvertJobDescriptionDTO;
  componentTitle: string = 'Company User Advert Job Description Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
