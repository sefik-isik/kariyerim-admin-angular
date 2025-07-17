import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAdvertAddComponent } from '../companyUserAdvertAdd/companyUserAdvertAdd.component';

@Component({
  selector: 'app-companyUserAdvert',
  templateUrl: './companyUserAdvert.component.html',
  styleUrls: ['./companyUserAdvert.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CompanyUserAdvertComponent {
  componentTitle = 'Company User Advert';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CompanyUserAdvertAddComponent, {
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
