import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserAddComponent } from '../personelUserAdd/personelUserAdd.component';

@Component({
  selector: 'app-personelUser',
  templateUrl: './personelUser.component.html',
  styleUrls: ['./personelUser.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class PersonelUserComponent {
  componentTitle = 'Personel Users';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(PersonelUserAddComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
  }
}
