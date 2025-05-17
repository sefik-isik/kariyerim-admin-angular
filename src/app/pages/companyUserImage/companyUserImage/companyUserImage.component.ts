import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserImageAddComponent } from '../companyUserImageAdd/companyUserImageAdd.component';

@Component({
  selector: 'app-companyUserImage',
  templateUrl: './companyUserImage.component.html',
  styleUrls: ['./companyUserImage.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CompanyUserImageComponent {
  componentTitle = 'Company User Images';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CompanyUserImageAddComponent, {
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
