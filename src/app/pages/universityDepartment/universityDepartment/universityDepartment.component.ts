import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartmentAddComponent } from '../universityDepartmentAdd/universityDepartmentAdd.component';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './universityDepartment.component.html',
  styleUrls: ['./universityDepartment.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class UniversityDepartmentComponent {
  componentTitle = 'University Departments';
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
    const modalRef = this.modalService.open(UniversityDepartmentAddComponent, {
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
