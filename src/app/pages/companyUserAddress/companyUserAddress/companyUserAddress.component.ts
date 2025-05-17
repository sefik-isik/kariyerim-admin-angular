import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAddressAddComponent } from '../companyUserAddressAdd/companyUserAddressAdd.component';

@Component({
  selector: 'app-companyUserAddress',
  templateUrl: './companyUserAddress.component.html',
  styleUrls: ['./companyUserAddress.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CompanyUserAddressComponent {
  componentTitle = 'Company User Addresses';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CompanyUserAddressAddComponent, {
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
