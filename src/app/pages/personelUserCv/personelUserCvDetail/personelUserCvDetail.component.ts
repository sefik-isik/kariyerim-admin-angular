import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvDTO } from '../../../models/personelUserCvDTO';

@Component({
  selector: 'app-personelUserCvDetail',
  templateUrl: './personelUserCvDetail.component.html',
  styleUrls: ['./personelUserCvDetail.component.css'],
  imports: [CommonModule],
})
export class PersonelUserCvDetailComponent implements OnInit {
  @Input() personelUserCvDTO: PersonelUserCvDTO;
  componentTitle: string = 'Personel User Cv Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
