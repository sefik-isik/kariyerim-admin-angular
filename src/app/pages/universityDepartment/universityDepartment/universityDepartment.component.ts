import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartmentAddComponent } from '../universityDepartmentAdd/universityDepartmentAdd.component';

@Component({
  selector: 'app-universityDepartment',
  templateUrl: './universityDepartment.component.html',
  styleUrls: ['./universityDepartment.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class UniversityDepartmentComponent {
  componentTitle = 'University Departments';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(UniversityDepartmentAddComponent, {
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
