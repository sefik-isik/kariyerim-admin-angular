import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UniversityFacultyAddComponent } from '../universityFacultyAdd/universityFacultyAdd.component';

@Component({
  selector: 'app-universityFaculty',
  templateUrl: './universityFaculty.component.html',
  styleUrls: ['./universityFaculty.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class UniversityFacultyComponent {
  componentTitle = 'Positions';
  admin: boolean = false;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
  }

  open() {
    if (!this.admin) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    const modalRef = this.modalService.open(UniversityFacultyAddComponent, {
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
