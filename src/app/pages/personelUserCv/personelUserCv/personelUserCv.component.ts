import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvAddComponent } from '../personelUserCvAdd/personelUserCvAdd.component';

@Component({
  selector: 'app-personelUserCv',
  templateUrl: './personelUserCv.component.html',
  styleUrls: ['./personelUserCv.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class PersonelUserCvComponent {
  componentTitle = 'Personel User Cvs';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(PersonelUserCvAddComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
  }
}
