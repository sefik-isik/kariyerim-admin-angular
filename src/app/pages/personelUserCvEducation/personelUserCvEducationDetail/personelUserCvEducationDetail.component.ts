import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvEducationDTO } from '../../../models/dto/personelUserCvEducationDTO';

@Component({
  selector: 'app-personelUserCvEducationDetail',
  templateUrl: './personelUserCvEducationDetail.component.html',
  styleUrls: ['./personelUserCvEducationDetail.component.css'],
  imports: [CommonModule],
})
export class PersonelUserCvEducationDetailComponent implements OnInit {
  @Input() personelUserCvEducationDTO: PersonelUserCvEducationDTO;
  componentTitle: string = 'Personel User Cv Education Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
