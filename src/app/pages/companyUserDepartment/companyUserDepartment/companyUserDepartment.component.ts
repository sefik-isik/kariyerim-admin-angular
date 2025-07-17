import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserDepartmentAddComponent } from '../companyUserDepartmentAdd/companyUserDepartmentAdd.component';

@Component({
  selector: 'app-companyUserDepartment',
  templateUrl: './companyUserDepartment.component.html',
  styleUrls: ['./companyUserDepartment.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CompanyUserDepartmentComponent {
  componentTitle = 'Company User Departments';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CompanyUserDepartmentAddComponent, {
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
