import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAdvertDTO } from '../../../models/dto/companyUserAdvertDTO';

@Component({
  selector: 'app-companyUserAdvertDetail',
  templateUrl: './companyUserAdvertDetail.component.html',
  styleUrls: ['./companyUserAdvertDetail.component.css'],
  imports: [CommonModule],
})
export class CompanyUserAdvertDetailComponent implements OnInit {
  @Input() companyUserAdvertDTO: CompanyUserAdvertDTO;
  componentTitle: string = 'Company User Advert Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
