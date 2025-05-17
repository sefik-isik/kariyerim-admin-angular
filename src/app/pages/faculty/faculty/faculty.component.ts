import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacultyAddComponent } from '../facultyAdd/facultyAdd.component';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class FacultyComponent {
  componentTitle = 'Faculties';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(FacultyAddComponent, {
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
