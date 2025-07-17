import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvEducationAddComponent } from '../personelUserCvEducationAdd/personelUserCvEducationAdd.component';

@Component({
  selector: 'app-personelUserCvEducation',
  templateUrl: './personelUserCvEducation.component.html',
  styleUrls: ['./personelUserCvEducation.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class PersonelUserCvEducationComponent {
  componentTitle = 'Personel User Cv Educations';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(
      PersonelUserCvEducationAddComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
  }
}
