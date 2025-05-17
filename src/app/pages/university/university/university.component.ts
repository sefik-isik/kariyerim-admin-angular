import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityAddComponent } from '../universityAdd/universityAdd.component';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class UniversityComponent {
  componentTitle = 'Universities';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(UniversityAddComponent, {
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
