import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAdvertCityAddComponent } from '../companyUserAdvertCityAdd/companyUserAdvertCityAdd.component';

@Component({
  selector: 'app-companyUserAdvertCity',
  templateUrl: './companyUserAdvertCity.component.html',
  styleUrls: ['./companyUserAdvertCity.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CompanyUserAdvertCityComponent {
  componentTitle = 'Company Advert Cities';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CompanyUserAdvertCityAddComponent, {
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
