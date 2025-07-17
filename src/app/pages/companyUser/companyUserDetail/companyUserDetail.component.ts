import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { NullDateFormatPipe } from '../../../pipes/nullDateFormat.pipe';

@Component({
  selector: 'app-companyUserDetail',
  templateUrl: './companyUserDetail.component.html',
  styleUrls: ['./companyUserDetail.component.css'],
  imports: [CommonModule, NullDateFormatPipe],
})
export class CompanyUserDetailComponent implements OnInit {
  @Input() companyUserDTO: CompanyUserDTO;
  componentTitle: string = 'Company User Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
