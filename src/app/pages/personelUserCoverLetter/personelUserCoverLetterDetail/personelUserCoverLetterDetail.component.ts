import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCoverLetterDTO } from '../../../models/dto/personelUserCoverLetterDTO';

@Component({
  selector: 'app-personelUserCoverLetterDetail',
  templateUrl: './personelUserCoverLetterDetail.component.html',
  styleUrls: ['./personelUserCoverLetterDetail.component.css'],
  imports: [CommonModule],
})
export class PersonelUserCoverLetterDetailComponent implements OnInit {
  @Input() personelUserCoverLetterDTO: PersonelUserCoverLetterDTO;
  componentTitle: string = 'Personel User Cover Letter Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
