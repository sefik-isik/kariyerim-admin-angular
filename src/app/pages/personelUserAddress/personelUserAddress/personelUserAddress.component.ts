import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserAddressAddComponent } from '../personelUserAddressAdd/personelUserAddressAdd.component';

@Component({
  selector: 'app-personelUserAddress',
  templateUrl: './personelUserAddress.component.html',
  styleUrls: ['./personelUserAddress.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class PersonelUserAddressComponent {
  componentTitle = 'Personel User Addresses';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(PersonelUserAddressAddComponent, {
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
