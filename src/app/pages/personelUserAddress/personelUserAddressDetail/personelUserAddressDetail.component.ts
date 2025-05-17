import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserAddressDTO } from '../../../models/personelUserAddressDTO';

@Component({
  selector: 'app-personelUserAddressDetail',
  templateUrl: './personelUserAddressDetail.component.html',
  styleUrls: ['./personelUserAddressDetail.component.css'],
  imports: [CommonModule],
})
export class PersonelUserAddressDetailComponent implements OnInit {
  @Input() personelUserAddressDTO: PersonelUserAddressDTO;
  componentTitle: string = 'Personel User Address Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
