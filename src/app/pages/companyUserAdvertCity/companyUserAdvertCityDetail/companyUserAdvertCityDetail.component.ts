import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAdvertCityDTO } from '../../../models/dto/companyUserAdvertCityDTO';

@Component({
  selector: 'app-companyUserAdvertCityDetail',
  templateUrl: './companyUserAdvertCityDetail.component.html',
  styleUrls: ['./companyUserAdvertCityDetail.component.css'],
  imports: [CommonModule],
})
export class CompanyUserAdvertCityDetailComponent implements OnInit {
  @Input() companyUserAdvertCityDTO: CompanyUserAdvertCityDTO;
  componentTitle: string = 'Company User Advert City Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
