import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCoverLetterAddComponent } from '../personelUserCoverLetterAdd/personelUserCoverLetterAdd.component';

@Component({
  selector: 'app-personelUserCoverLetter',
  templateUrl: './personelUserCoverLetter.component.html',
  styleUrls: ['./personelUserCoverLetter.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class PersonelUserCoverLetterComponent {
  componentTitle = 'Personel User Cover Letters';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(
      PersonelUserCoverLetterAddComponent,
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
