import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkingMethodAddComponent } from '../workingMethodAdd/workingMethodAdd.component';

@Component({
  selector: 'app-workingMethod',
  templateUrl: './workingMethod.component.html',
  styleUrls: ['./workingMethod.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class WorkingMethodComponent {
  componentTitle = 'Working Methods';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(WorkingMethodAddComponent, {
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
