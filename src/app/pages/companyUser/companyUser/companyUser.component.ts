import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAddComponent } from '../companyUserAdd/companyUserAdd.component';

@Component({
  selector: 'app-companyUser',
  templateUrl: './companyUser.component.html',
  styleUrls: ['./companyUser.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CompanyUserComponent {
  componentTitle = 'Company Users';

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CompanyUserAddComponent, {
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
