import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvWorkExperienceDTO } from '../../../models/dto/personelUserCvWorkExperienceDTO';

@Component({
  selector: 'app-personelUserCvWorkExperienceDetail',
  templateUrl: './personelUserCvWorkExperienceDetail.component.html',
  styleUrls: ['./personelUserCvWorkExperienceDetail.component.css'],
  imports: [CommonModule],
})
export class PersonelUserCvWorkExperienceDetailComponent implements OnInit {
  @Input() personelUserCvWorkExperienceDTO: PersonelUserCvWorkExperienceDTO;
  componentTitle: string = 'Personel User Cv Work Experience Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
