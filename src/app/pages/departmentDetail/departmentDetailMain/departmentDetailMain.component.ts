import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentDetailAddComponent } from '../departmentDetailAdd/departmentDetailAdd.component';

@Component({
  selector: 'app-departmentDetailMain',
  templateUrl: './departmentDetailMain.component.html',
  styleUrls: ['./departmentDetailMain.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class DepartmentDetailMainComponent {
  componentTitle = 'Department Details';

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(DepartmentDetailAddComponent, {
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
