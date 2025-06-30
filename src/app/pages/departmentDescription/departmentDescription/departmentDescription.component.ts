import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentDescriptionAddComponent } from '../departmentDescriptionAdd/departmentDescriptionAdd.component';

@Component({
  selector: 'app-departmentDescription',
  templateUrl: './departmentDescription.component.html',
  styleUrls: ['./departmentDescription.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class DepartmentDescriptionComponent {
  componentTitle = 'Department Descriptions';

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(DepartmentDescriptionAddComponent, {
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
