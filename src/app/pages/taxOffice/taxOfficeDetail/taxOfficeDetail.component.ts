import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaxOfficeDTO } from '../../../models/dto/taxOfficeDTO';

@Component({
  selector: 'app-taxOfficeDetail',
  templateUrl: './taxOfficeDetail.component.html',
  styleUrls: ['./taxOfficeDetail.component.css'],
  imports: [CommonModule],
})
export class TaxOfficeDetailComponent implements OnInit {
  @Input() taxOfficeDTO: TaxOfficeDTO;
  componentTitle: string = 'Tax Office Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
