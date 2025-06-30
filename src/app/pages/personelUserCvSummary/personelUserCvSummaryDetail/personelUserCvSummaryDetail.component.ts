import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvSummaryDTO } from '../../../models/dto/personelUserCvSummaryDTO';

@Component({
  selector: 'app-personelUserCvSummaryDetail',
  templateUrl: './personelUserCvSummaryDetail.component.html',
  styleUrls: ['./personelUserCvSummaryDetail.component.css'],
  imports: [CommonModule],
})
export class PersonelUserCvSummaryDetailComponent implements OnInit {
  @Input() personelUserCvSummaryDTO: PersonelUserCvSummaryDTO;
  componentTitle: string = 'Personel User Cv Summary Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
