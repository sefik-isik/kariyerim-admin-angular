import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserFileDTO } from '../../../models/dto/personelUserFileDTO';

@Component({
  selector: 'app-personelUserFileDetail',
  templateUrl: './personelUserFileDetail.component.html',
  styleUrls: ['./personelUserFileDetail.component.css'],
  imports: [CommonModule],
})
export class PersonelUserFileDetailComponent implements OnInit {
  @Input() personelUserFileDTO: PersonelUserFileDTO;
  componentTitle: string = 'Personel User File Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
