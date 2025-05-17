import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvWorkExperienceAddComponent } from '../personelUserCvWorkExperienceAdd/personelUserCvWorkExperienceAdd.component';

@Component({
  selector: 'app-personelUserCvWorkExperience',
  templateUrl: './personelUserCvWorkExperience.component.html',
  styleUrls: ['./personelUserCvWorkExperience.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class PersonelUserCvWorkExperienceComponent {
  componentTitle = 'Personel User Cv Work Experiences';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(
      PersonelUserCvWorkExperienceAddComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
        centered: true,
        scrollable: true,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
  }
}
