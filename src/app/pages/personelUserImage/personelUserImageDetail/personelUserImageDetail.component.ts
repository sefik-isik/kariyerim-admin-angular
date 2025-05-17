import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserImageDTO } from '../../../models/personelUserImageDTO';

@Component({
  selector: 'app-personelUserImageDetail',
  templateUrl: './personelUserImageDetail.component.html',
  styleUrls: ['./personelUserImageDetail.component.css'],
  imports: [CommonModule],
})
export class PersonelUserImageDetailComponent implements OnInit {
  @Input() personelUserImageDTO: PersonelUserImageDTO;
  componentTitle: string = 'Personel User Image Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
