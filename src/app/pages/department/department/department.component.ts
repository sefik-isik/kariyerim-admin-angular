import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentAddComponent } from '../departmentAdd/departmentAdd.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class DepartmentComponent {
  componentTitle = 'Departments';

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(DepartmentAddComponent, {
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
