import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { NullDateFormatPipe } from '../../../pipes/nullDateFormat.pipe';

@Component({
  selector: 'app-personelUserDetail',
  templateUrl: './personelUserDetail.component.html',
  styleUrls: ['./personelUserDetail.component.css'],
  imports: [CommonModule, NullDateFormatPipe],
})
export class PersonelUserDetailComponent implements OnInit {
  @Input() personelUserDTO: PersonelUserDTO;
  componentTitle: string = 'Personel User Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
