import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserImageAddComponent } from '../personelUserImageAdd/personelUserImageAdd.component';

@Component({
  selector: 'app-personelUserImage',
  templateUrl: './personelUserImage.component.html',
  styleUrls: ['./personelUserImage.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class PersonelUserImageComponent {
  componentTitle = 'Personel User Images';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(PersonelUserImageAddComponent, {
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
