import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserFileAddComponent } from '../companyUserFileAdd/companyUserFileAdd.component';

@Component({
  selector: 'app-companyUserFile',
  templateUrl: './companyUserFile.component.html',
  styleUrls: ['./companyUserFile.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CompanyUserFileComponent {
  componentTitle = 'Company User Files';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CompanyUserFileAddComponent, {
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
